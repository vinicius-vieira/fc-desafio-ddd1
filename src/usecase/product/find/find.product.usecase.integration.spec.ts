import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/product.model";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

describe("Integration Test find product use case", () => {

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

    afterAll(async () => {
      await sequelize.close();
    });

    it("should find a product", async () => {

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 1.0);
        await productRepository.create(product);

        const usecase =  new FindProductUseCase(productRepository);

        const input = {
            id: "123",
        };

        const output = {
            id: "123",
            name: "Product 1",
            price: 1.0,
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);

      });

      it("should not find a product", async () => {

        const productRepository = new ProductRepository();
        const usecase =  new FindProductUseCase(productRepository);

        const input = {
            id: "1",
        };

        expect(()=>{
          return usecase.execute(input);
        }).rejects.toThrow("Product not found");

      });
});