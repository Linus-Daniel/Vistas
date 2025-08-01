import { NextResponse } from "next/server";
import crypto from "crypto";
import Order from "@/models/Order";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    if (!signature) {
      return NextResponse.json(
        { success: false, message: "No signature" },
        { status: 401 }
      );
    }

    // Verify the webhook signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_WEBHOOK_SECRET!)
      .update(body)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    // Handle the event
    switch (event.event) {
      case "charge.success":
        const paymentRef = event.data.reference;
        // Update order status in database
        await Order.updateMany({ paymentId: paymentRef }, { status: "paid" });
        break;

      case "charge.failure":
        const failedRef = event.data.reference;
        // Update order status to failed
        await Order.updateMany({ paymentId: failedRef }, { status: "failed" });
        break;

      case "transfer.success":
        // Handle successful transfer to delivery center
        break;

      default:
        console.log(`Unhandled event type: ${event.event}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, message: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
