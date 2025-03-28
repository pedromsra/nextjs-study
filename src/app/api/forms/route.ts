import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  console.log(formData.get("input"));
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.redirect(`${process.env.BASE_URL}/product/${formData.get("input")}`);
}
