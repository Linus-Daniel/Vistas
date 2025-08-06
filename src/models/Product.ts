import mongoose, { Document } from "mongoose";

interface ISpecification {
  label: string;
  value: string;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  rating?: number;
  category: string;
  stock: number;
  reviewCount?: number;
  tags?: string[];
  sku: string;
  inStock: boolean;
  specifications?: ISpecification[];
  createdAt?: Date;
  updatedAt?: Date;
}

const SpecificationSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    category: {
      type: String,
      required: true,
      enum: [
        "Microcontrollers",
        "Integrated Circuits (ICs)",
        "Sensors",
        "Resistors",
        "Capacitors",
        "Transistors",
        "Development Boards",
        "Power Modules",
        "Connectors",
        "LEDs",
        "Displays",
        "Motors",
        "Other Components",
      ],
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    inStock: { type: Boolean, default: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    tags: { type: [String], default: [] },
    specifications: { type: [SpecificationSchema], default: [] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.index({ category: 1, inStock: 1 });
ProductSchema.index({ name: "text", description: "text" });

// Virtual for calculating discount percentage
ProductSchema.virtual("discountPercentage").get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  return 0;
});

// Pre-save middleware to update inStock based on stock quantity
ProductSchema.pre("save", function (next) {
  this.inStock = this.stock > 0;
  next();
});

// Static method to get products by category
ProductSchema.statics.getByCategory = function (category: string) {
  return this.find({ category, inStock: true }).sort({ createdAt: -1 });
};

// Static method to get low stock products
ProductSchema.statics.getLowStock = function (threshold: number = 10) {
  return this.find({ stock: { $lte: threshold }, inStock: true });
};

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
