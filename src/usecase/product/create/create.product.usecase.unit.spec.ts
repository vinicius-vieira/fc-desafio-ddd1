import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 1.01,
}

const MockRepository = () =>{
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test create product use case", () => {

    it("should create a product", async () => {

        const productRepository = MockRepository();
        const createProductUseCase =  new CreateProductUseCase(productRepository);

        const output = await createProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
           price: 1.01
        });
      });

      it("should throw an error when name is missing", async () => {

        const productRepository = MockRepository();
        const createProductUseCase =  new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(createProductUseCase.execute(input)).rejects.toThrow( "Name is required" );
      });

      it("should throw an error when price is < 0.0", async () => {

        const productRepository = MockRepository();
        const createProductUseCase =  new CreateProductUseCase(productRepository);

        input.name = "Product 1";
        input.price = -1.0;

        await expect(createProductUseCase.execute(input)).rejects.toThrow( "Price must be greater than zero" );
      });
});