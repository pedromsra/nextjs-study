import Price from "./price.interface";

export interface IProduct {
  id: string;
  name: string;
  price: number;
}

class Product implements IProduct {
  readonly id: string;
  readonly name: string;
  readonly price: number;

  constructor({
    id,
    name,
    price,
  }: {
    id: string;
    name: string;
    price: number;
  }) {
    const _price = new Price(price);

    this.price = _price.toNumber();
    this.id = id;
    this.name = name;
  }

  getValue(): IProduct {
    return { id: this.id, name: this.name, price: this.price };
  }
}

export default Product;
