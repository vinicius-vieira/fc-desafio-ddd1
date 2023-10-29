import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/product.model";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import CreateProductUseCase from "./create.product.usecase";


const input = {
  name: "Product 1",
  price: 1.01,
}

describe("Integration Test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });

      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });

    afterEach(async () => {
      await sequelize.close();
    });

    it("should create a product", async () => {

        const productRepository = new ProductRepository();
        const usecase =  new CreateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
      });

      it("should throw an error when name is missing", async () => {

        const productRepository = new ProductRepository();
        const usecase =  new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow( "Name is required" );
      });

      it("should throw an error when price is < 0.0", async () => {

        const productRepository = new ProductRepository();
        const usecase =  new CreateProductUseCase(productRepository);

        input.name = "Product 1";
        input.price = -1.0;

        await expect(usecase.execute(input)).rejects.toThrow(  "Price must be greater than zero" );
      });
});