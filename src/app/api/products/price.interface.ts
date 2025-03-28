class Price {
  private readonly value: number;
  constructor(price: number | null) {
    if (price === null) {
      throw new Error("Inform a valid number");
    }
    this.validatePrice(price);
    this.value = price;
  }

  private validatePrice(price: number): void {
    if (price < 0) {
      throw new Error("Invalid Price");
    }
  }

  toNumber(): number {
    if (this.value === null) {
      throw new Error("Price does not exist");
    }
    return this.value;
  }
}

export default Price;
