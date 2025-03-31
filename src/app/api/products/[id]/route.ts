import { NextResponse } from 'next/server';

import ProductStore from '../products.data';

const productStore = ProductStore;

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const product = productStore.getProduct(id);
    return NextResponse.json(product);
  } catch (e) {
    return NextResponse.json(
      { error: { message: (e as { message: string }).message, status: 404 } },
      { status: 404 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { name, price } = await req.json();
  if (!name || !price) {
    return NextResponse.json(
      { massage: 'Name and Price are required' },
      { status: 400 },
    );
  }
  try {
    const product = productStore.updateProduct({
      id,
      name,
      price,
    });
    return NextResponse.json(product, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 404 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    productStore.deleteProduct(id);
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 404 });
  }
}
