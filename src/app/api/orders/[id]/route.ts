// app/api/orders/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import mongoose from "mongoose";
import { sendOrderStatusEmail } from "../../../../lib/email";

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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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
  const validStatuses = [
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "completed",
    "failed",
  ];
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
    // First get the current order to compare status
    const currentOrder = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.product", "name price");

    if (!currentOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // Check if status is actually changing
    const isStatusChanging = currentOrder.status !== status;

    // Update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
      { new: true }
    )
      .populate("user", "name email")
      .populate("items.product", "name price");

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // Send email notification if status changed
    if (isStatusChanging) {
      try {
        await sendOrderStatusEmail({
          order: updatedOrder,
          previousStatus: currentOrder.status,
          newStatus: status,
        });
        console.log(
          `Email sent for order ${id} status change: ${currentOrder.status} -> ${status}`
        );
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error(`Failed to send email for order ${id}:`, emailError);
        // You might want to add this to a retry queue in production
      }
    }

    return NextResponse.json({
      message: "Order status updated successfully",
      order: updatedOrder,
      emailSent: isStatusChanging,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { message: "Error updating order status" },
      { status: 500 }
    );
  }
}
