import mongoose, { Document } from "mongoose";

interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface IDeliveryInfo {
  address?: string;
  city?: string;
  zip?: string;
  centerId?: string;
  centerName?: string;
  centerAddress?: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  paymentId: string;
  items: IOrderItem[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "completed" | "failed";
  deliveryType: "delivery" | "pickup";
  deliveryInfo: IDeliveryInfo;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    paymentId: { type: String, required: true, unique: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["processing", "shipped", "delivered", "completed", "failed"],
      default: "processing",
    },
    deliveryType: {
      type: String,
      enum: ["delivery", "pickup"],
      required: true,
    },
    deliveryInfo: {
      address: { type: String },
      city: { type: String },
      zip: { type: String },
      centerId: { type: String },
      centerName: { type: String },
      centerAddress: { type: String },
    },
  },
  { timestamps: true } // This automatically adds createdAt and updatedAt
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
