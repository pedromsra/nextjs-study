// import { IProduct } from "../../api/products/products.interface";

// export const revalidate = 60;
// export const dynamicParams = true;

// export async function generateStaticParams() {
//   const products: IProduct[] = await fetch(
//     `${process.env.BASE_URL}/api/products`
//   ).then((res) => res.json());

//   return products.map((product) => ({
//     id: product.id,
//   }));
// }

export const dynamic = "force-dynamic";

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(`${process.env.BASE_URL}/api/products/${id}`, {
    next: { revalidate: 60 },
  });

  const product = await response.json();

  if (product.error) {
    throw new Error(product.error.message);
  }

  return (
    <article>
      <h6>{product.name}</h6>
      <p>{product.price}</p>
    </article>
  );
}
