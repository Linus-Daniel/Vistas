
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { emailTemplates, sendEmail } from "@/lib/email";
import User from "@/models/User";

export async function GET() {
  await dbConnect();
  try {
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
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
    const product = await Product.create(body);

    // Check stock level and send alert if low
    if (product.stock < 10) {
      const admins = await User.find({ role: "admin" });
      for (const admin of admins) {
        await sendEmail({
          to: admin.email,
          subject: "Low Stock Alert",
          html: emailTemplates.lowStockAlert(product.name, product.stock),
        });
      }
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}