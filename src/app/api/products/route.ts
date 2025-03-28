import { NextResponse } from "next/server";
import Product from "./products.interface";
import ProductStore from "./products.data";

const productStore = ProductStore;

export async function GET() {
  return NextResponse.json(productStore.getProducts());
}

export async function POST(req: Request) {
  const { name, price } = await req.json();
  if (!name || !price) {
    return NextResponse.json({ message: "Name and Price are required" });
  }
  const product = new Product({
    id: String(productStore.getProducts().length + 1),
    name,
    price,
  });
  productStore.addProduct(product);

  return NextResponse.json(product, { status: 201 });
}
