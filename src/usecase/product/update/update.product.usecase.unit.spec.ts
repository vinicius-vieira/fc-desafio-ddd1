import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 1.0);

const input = {
  id: product.id,
  name: "Product Updated",
  price: 2.0,
}

const MockRepository = () =>{
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
}

describe("Unit Test update product use case", () => {

    it("should update a product", async () => {

        const productRepository = MockRepository();
        const productUsecase =  new UpdateProductUseCase(productRepository);

        const output = await productUsecase.execute(input);

        expect({
          id: output.id,
          name: output.name,
          price: output.price,
         }).toEqual(input);
      });
});