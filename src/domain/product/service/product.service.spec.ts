import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    const product1 = new Product("product1", "Product 1", 10);
    const product2 = new Product("product2", "Product 2", 20);
    const products = [product1, product2];

    ProductService.changePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);

    ProductService.changePrice(products, -50);

    expect(product1.price).toBe(10);
    expect(product2.price).toBe(20);
  });
});

