import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const product = await Product.findById(params.id);
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const body = await req.json();
  const updatedProduct = await Product.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!updatedProduct) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(updatedProduct);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const deletedProduct = await Product.findByIdAndDelete(params.id);
  if (!deletedProduct) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Product deleted successfully" });
}
