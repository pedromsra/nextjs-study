import Link from 'next/link';
import { IProduct } from './api/products/products.interface';

export const dynamic = 'force-dynamic';

async function getData() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/products`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error('Erro ao buscar produtos');
    }

    const products = await res.json();

    if (products.error) {
      throw new Error(products.error.message);
    }

    return products;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getData();
  return (
    <section>
      <h1>Products list</h1>
      {products.length ? (
        <ul data-testid="product-list">
          {products.map((p: IProduct) => (
            <li key={p.id} data-testid={`product-${p.id}`}>
              <Link href={`/product/${p.id}`}>
                <article>
                  <h6 data-testid={`product-name-${p.name}`}>{p.name}</h6>
                  <p data-testid={`product-price-${p.price}`}>
                    {p.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </p>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p data-testid="no-products">No products find</p>
      )}
    </section>
  );
}
