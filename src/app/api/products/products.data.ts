import Product, { IProduct } from "./products.interface";

const initialState: IProduct[] = [
  { id: "1", name: "Laptop", price: 1200 },
  { id: "2", name: "Phone", price: 800 },
];

class ProductStore {
  private static instance: ProductStore;
  private products: Product[] = initialState.map((p) => new Product(p));

  private constructor() {}

  static getInstance(): ProductStore {
    if (!ProductStore.instance) {
      ProductStore.instance = new ProductStore();
    }
    return ProductStore.instance;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  getProducts(): IProduct[] {
    return this.products.map((product) => product.getValue());
  }

  getProduct(id: string): IProduct {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }
    return this.products[productIndex];
  }

  updateProduct({
    id,
    name,
    price,
  }: {
    id: string;
    name: string;
    price: number;
  }) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }
    const _product = new Product({ id, name, price });
    this.products[productIndex] = _product;
    return true;
  }

  deleteProduct(id: string) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error("Product not found");
    }
    this.products = this.products.filter((p) => p.id !== id);
    return true;
  }
}

export default ProductStore.getInstance();
