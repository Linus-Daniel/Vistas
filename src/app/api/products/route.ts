import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { emailTemplates, sendEmail } from "@/lib/email";
import User from "@/models/User";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "");
    const skip = (page - 1) * limit;

    // Build query
    let query: any = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    // Build sort
    let sort: any = { createdAt: -1 }; // Default sort

    switch (sortBy) {
      case "name-asc":
        sort = { name: 1 };
        break;
      case "name-desc":
        sort = { name: -1 };
        break;
      case "price-asc":
        sort = { price: 1 };
        break;
      case "price-desc":
        sort = { price: -1 };
        break;
      case "stock-asc":
        sort = { stock: 1 };
        break;
      case "stock-desc":
        sort = { stock: -1 };
        break;
      case "rating-desc":
        sort = { rating: -1 };
        break;
    }

    // Execute query
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();

    // Validate required fields
    const requiredFields = ["name", "price", "description", "category", "sku"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Check if SKU already exists
    const existingSku = await Product.findOne({ sku: body.sku.toUpperCase() });
    if (existingSku) {
      return NextResponse.json(
        { message: "SKU already exists" },
        { status: 400 }
      );
    }

    // Process specifications - filter out empty ones
    if (body.specifications) {
      body.specifications = body.specifications.filter(
        (spec: any) =>
          spec.label && spec.label.trim() && spec.value && spec.value.trim()
      );
    }

    // Create the product
    const productData = {
      ...body,
      sku: body.sku.toUpperCase(),
      inStock: body.stock > 0,
      // Ensure numeric fields are numbers
      price: parseFloat(body.price),
      originalPrice: body.originalPrice
        ? parseFloat(body.originalPrice)
        : undefined,
      stock: parseInt(body.stock || 0),
      rating: 0, // New products start with no rating
      reviewCount: 0, // New products start with no reviews
    };

    const product = await Product.create(productData);

    // Check stock level and send alert if low
    if (product.stock < 10) {
      try {
        const admins = await User.find({ role: "admin" });
        const emailPromises = admins.map((admin) =>
          sendEmail({
            to: admin.email,
            subject: "Low Stock Alert - New Product",
            html: emailTemplates.lowStockAlert(product.name, product.stock),
          })
        );

        // Don't await email sending to avoid blocking the response
        Promise.all(emailPromises).catch((emailError) =>
          console.error("Error sending low stock alert emails:", emailError)
        );
      } catch (emailError) {
        console.error("Error preparing low stock alert emails:", emailError);
        // Don't fail the product creation if email fails
      }
    }

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating product:", error);

    // Handle duplicate key error (SKU)
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "SKU already exists" },
        { status: 400 }
      );
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return NextResponse.json(
        { message: messages.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Process specifications
    if (updateData.specifications) {
      updateData.specifications = updateData.specifications.filter(
        (spec: any) =>
          spec.label && spec.label.trim() && spec.value && spec.value.trim()
      );
    }

    // Ensure numeric fields are numbers
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.originalPrice)
      updateData.originalPrice = parseFloat(updateData.originalPrice);
    if (updateData.stock !== undefined)
      updateData.stock = parseInt(updateData.stock);
    if (updateData.sku) updateData.sku = updateData.sku.toUpperCase();

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error: any) {
    console.error("Error updating product:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { message: "SKU already exists" },
        { status: 400 }
      );
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return NextResponse.json(
        { message: messages.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Error updating product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Error deleting product" },
      { status: 500 }
    );
  }
}
