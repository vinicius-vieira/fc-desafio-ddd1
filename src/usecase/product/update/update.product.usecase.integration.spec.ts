import { Sequelize } from "sequelize-typescript";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/product.model";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import Product from "../../../domain/product/entity/product";

const product = new Product("123", "Product 1", 1.0);

const input = {
  id: product.id,
  name: "Product Updated",
  price: 2.0,
}

describe("Integration Test update product use case", () => {
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

  it("should update a product", async () => {

      const productRepository = new ProductRepository();
      await productRepository.create(product);

      const productUsecase = new UpdateProductUseCase(productRepository);

      const output = await productUsecase.execute(input);

      expect({
        id: output.id,
        name: output.name,
        price: output.price,
        }).toEqual(input);
    });
});