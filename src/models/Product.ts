import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  image: string;
  rating?: number;
  category:string;
  stock:number;
  reviewCount?: number;
  tags?: string[];
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  stock:{type:Number, required:true},
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  tags: { type: [String], default: [] },
});

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
