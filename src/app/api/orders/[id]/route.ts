// app/api/orders/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Validate MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid order ID format" },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    // Find order and ensure it belongs to the current user
    const order = await Order.findOne({
      _id: id,
      user: session.user.id,
    }).populate("items.product", "name"); // Optionally populate product details

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);

 

    return NextResponse.json(
      { message: "Error fetching order details" },
      { status: 500 }
    );
  }
}

// Optional: Add PATCH method for updating order status (admin only)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Check if user is admin (you'll need to implement this logic)
  // if (!session.user.isAdmin) {
  //   return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  // }

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid order ID format" },
      { status: 400 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const { status } = body;

  // Validate status
  const validStatuses = ["processing", "shipped", "delivered", "cancelled"];
  if (!status || !validStatuses.includes(status)) {
    return NextResponse.json(
      {
        message: "Invalid status. Must be one of: " + validStatuses.join(", "),
      },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // Optional: Send email notification about status change
    // You could implement this similar to the order creation email

    return NextResponse.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { message: "Error updating order status" },
      { status: 500 }
    );
  }
}
