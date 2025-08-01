import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { sendEmail, emailTemplates } from "@/lib/email";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const orders = await Order.find({ user: session.user.id });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    // Get user's cart
    const cart = await Cart.findOne({ user: session.user.id }).populate(
      "items.product"
    );
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    // Check stock for all items
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { message: `Not enough stock for ${item.name}` },
          { status: 400 }
        );
      }
    }

    // Create order
    const order = new Order({
      user: session.user.id,
      items: cart.items.map((item:any) => ({
        product: item.product._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      total: cart.items.reduce(
        (total:number, item:any) => total + item.price * item.quantity,
        0
      ),
      status: "processing",
    });

    // Update product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // Clear cart
    await Cart.findByIdAndDelete(cart._id);

    // Save order
    await order.save();

    // Send confirmation email
    const user = await User.findById(session.user.id);
    if (user) {
      await sendEmail({
        to: user.email,
        subject: "Order Confirmation",
        html: emailTemplates.orderStatusUpdate(
          order._id.toString(),
          "processing"
        ),
      });
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating order" },
      { status: 500 }
    );
  }
}
