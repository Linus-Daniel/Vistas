import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import mongoose from "mongoose";

// ==========================
// 📦 Types
// ==========================

interface CartItem {
  product: mongoose.Types.ObjectId | string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// ==========================
// 🔍 GET /api/cart
// ==========================

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await dbConnect();

  try {
    const cart = await Cart.findOne({ user: session.user.id }).populate(
      "items.product"
    );
    return NextResponse.json(cart || { items: [], user: session.user.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching cart" },
      { status: 500 }
    );
  }
}

// ==========================
// ➕ POST /api/cart
// ==========================

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await dbConnect();

  try {
    const { productId, quantity }: { productId: string; quantity: number } =
      await req.json();

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { message: "Not enough stock" },
        { status: 400 }
      );
    }

    let cart = await Cart.findOne({ user: session.user.id });
    if (!cart) {
      cart = new Cart({ user: session.user.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item: CartItem) => item.product.toString() === productId
    );

    if (existingItem) {
      if (product.stock < existingItem.quantity + quantity) {
        return NextResponse.json({ message: "Exceeds stock" }, { status: 400 });
      }
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = {
        product: productId,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      };
      cart.items.push(newItem);
    }

    await cart.save();
    return NextResponse.json(cart);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating cart" },
      { status: 500 }
    );
  }
}

// ==========================
// 🔄 PUT /api/cart
// ==========================

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await dbConnect();

  try {
    const { productId, quantity }: { productId: string; quantity: number } =
      await req.json();

    const cart = await Cart.findOne({ user: session.user.id });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const item = cart.items.find(
      (item: CartItem) => item.product.toString() === productId
    );
    console.log("The products is ", productId);
    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i: CartItem) => i.product.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    return NextResponse.json(cart);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating quantity" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  try {
    const cart = await Cart.findOne({ user: session.user.id });
    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    if (productId) {
      cart.items = cart.items.filter(
        (item: CartItem) => item.product.toString() !== productId
      );
    } else {
      cart.items = []; // Clear entire cart
    }

    await cart.save();
    return NextResponse.json({ message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error removing item" },
      { status: 500 }
    );
  }
}
