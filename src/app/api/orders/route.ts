import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { sendEmail, emailTemplates } from "@/lib/email";
import mongoose from "mongoose";
import axios, { Axios } from "axios";
Axios;
// ==============================
// 🧾 TYPES
// ==============================

interface DeliveryInfo {
  address?: string;
  city?: string;
  zip?: string;
  centerId?: string;
}

interface PaymentVerification {
  success: boolean;
  amount: number;
  data: {
    reference: string;
    status: string;
    amount: number;
  } | null;
}

interface CartItem {
  product: {
    _id: mongoose.Types.ObjectId;
    name: string;
    stock: number;
  };
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// ==============================
// ✅ VERIFY PAYMENT FUNCTION
// ==============================

async function verifyPaystackPayment(
  reference: string
): Promise<PaymentVerification> {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    const data = await response.data;

    return {
      success: data.status && data.data.status === "success",
      amount: data.data?.amount / 100, // kobo to naira
      data: data.data,
    };
  } catch (error) {
    console.error("Payment verification error:", error);
    return { success: false, amount: 0, data: null };
  }
}

// ==============================
// ✅ DELIVERY VALIDATION
// ==============================

function validateDeliveryInfo(
  deliveryType: string,
  deliveryInfo: DeliveryInfo
): { valid: boolean; message: string } {
  if (!deliveryType || !deliveryInfo) {
    return { valid: false, message: "Delivery type and info are required" };
  }

  if (deliveryType === "delivery") {
    const required: (keyof DeliveryInfo)[] = ["address", "city", "zip"];
    for (const field of required) {
      if (!deliveryInfo[field] || deliveryInfo[field]?.trim() === "") {
        return { valid: false, message: `${field} is required for delivery` };
      }
    }
  } else if (deliveryType === "pickup") {
    if (!deliveryInfo.centerId) {
      return { valid: false, message: "Pickup center is required" };
    }
  } else {
    return { valid: false, message: "Invalid delivery type" };
  }

  return { valid: true, message: "" };
}

// ==============================
// ✅ RATE LIMITING
// ==============================

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const userRequests = rateLimitMap.get(userId) || [];
  const validRequests = userRequests.filter(
    (time) => now - time < RATE_LIMIT_WINDOW
  );

  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  validRequests.push(now);
  rateLimitMap.set(userId, validRequests);
  return true;
}

// ==============================
// ✅ GET ORDERS
// ==============================

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {

    if(user.role !== "admin" && user) {

    
    const orders = await Order.find({ user: user.id })
      .populate("items.product", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);}

    // Admin can fetch all orders
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });
    return NextResponse.json(orders);
    
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 }
    );
  }
}

// ==============================
// ✅ POST - CREATE ORDER
// ==============================

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!checkRateLimit(session.user.id)) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  await dbConnect();

  let body: {
    paymentId: string;
    deliveryType: string;
    deliveryInfo: DeliveryInfo;
  };

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const { paymentId, deliveryType, deliveryInfo } = body;

  if (!paymentId) {
    return NextResponse.json(
      { message: "Payment ID is required" },
      { status: 400 }
    );
  }

  const validation = validateDeliveryInfo(deliveryType, deliveryInfo);
  if (!validation.valid) {
    return NextResponse.json({ message: validation.message }, { status: 400 });
  }

  const mongoSession = await mongoose.startSession();

  try {
    return await mongoSession.withTransaction(async () => {
      const existingOrder = await Order.findOne({ paymentId }).session(
        mongoSession
      );
      if (existingOrder) {
        console.log(`Duplicate order attempt with paymentId: ${paymentId}`);
        return NextResponse.json(existingOrder);
      }

      const paymentVerification = await verifyPaystackPayment(paymentId);
      if (!paymentVerification.success) {
        return NextResponse.json(
          { message: "Payment verification failed Error:${error}" },
          { status: 400 }
        );
      }

      const cart = await Cart.findOne({ user: session.user.id })
        .populate("items.product")
        .session(mongoSession);

      if (!cart || cart.items.length === 0) {
        return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
      }

      const cartItems = cart.items as CartItem[];

      const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const amountDifference = Math.abs(paymentVerification.amount - cartTotal);

      if (amountDifference > 0.01) {
        return NextResponse.json(
          { message: "Amount mismatch" },
          { status: 400 }
        );
      }

      const stockIssues: string[] = [];

      for (const item of cartItems) {
        const product = await Product.findById(item.product._id).session(
          mongoSession
        );
        if (!product) {
          stockIssues.push(`Product ${item.name} not found`);
        } else if (product.stock < item.quantity) {
          stockIssues.push(
            `Not enough stock for ${item.name}. Available: ${product.stock}, Requested: ${item.quantity}`
          );
        }
      }

      if (stockIssues.length > 0) {
        return NextResponse.json(
          { message: "Stock issues", issues: stockIssues },
          { status: 400 }
        );
      }

      const order = new Order({
        user: session.user.id,
        items: cartItems.map((item) => ({
          product: item.product._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total: cartTotal,
        status: "processing",
        deliveryInfo,
        deliveryType,
        paymentId,
        paymentData: {
          reference: paymentVerification.data?.reference,
          amount: paymentVerification.amount,
          verifiedAt: new Date(),
        },
      });

      const stockUpdates = cartItems.map((item) =>
        Product.findByIdAndUpdate(
          item.product._id,
          { $inc: { stock: -item.quantity } },
          { session: mongoSession }
        )
      );
      await Promise.all(stockUpdates);

      await order.save({ session: mongoSession });
      await Cart.findByIdAndDelete(cart._id, { session: mongoSession });

      setImmediate(async () => {
        try {
          const user = await User.findById(session.user.id);
          if (user?.email) {
            await sendEmail({
              to: user.email,
              subject: `Order Confirmation - #${order._id}`,
              html: emailTemplates.orderStatusUpdate(
                order._id.toString(),
                "processing"
              ),
            });
          }
        } catch (emailError) {
          console.error("Email sending error:", emailError);
        }
      });

      return NextResponse.json({
        _id: order._id,
        status: order.status,
        total: order.total,
        deliveryType: order.deliveryType,
        createdAt: order.createdAt,
        message: "Order created successfully",
      });
    });
  } catch (error: any) {
    console.error("Order creation error:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { message: "Invalid data", details: error.message },
        { status: 400 }
      );
    }

    if (error.name === "MongoNetworkError") {
      return NextResponse.json(
        { message: "Database connection error" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: "Order processing failed" },
      { status: 500 }
    );
  } finally {
    await mongoSession.endSession();
  }
}
