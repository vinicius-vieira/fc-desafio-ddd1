import CreateCustomerUseCase from "./create.customer.usecase";
import CustomerModel from "../../../infrastructure/customer/repository/customer.model";
import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "../../../infrastructure/customer/repository/customer.repository";

const input = {
  name: "Customer 1",
  street: "Street 1",
  city: "City 1",
  number: 1,
  zip: "Zipcode 1",
}

describe("Integration Test create customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });

      await sequelize.addModels([CustomerModel]);
      await sequelize.sync();
    });

    afterAll(async () => {
      await sequelize.close();
    });

    it("should create a customer", async () => {

        const customerRepository = new CustomerRepository();
        const usecase =  new CreateCustomerUseCase(customerRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.street,
                city: input.city,
                number: input.number,
                zip: input.zip,
            },
        });
      });

      it("should throw an error when name is missing", async () => {

        const customerRepository = new CustomerRepository();
        const usecase =  new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow( "Name is required" );
      });

      it("should throw an error when streat is missing", async () => {

        const customerRepository = new CustomerRepository();
        const usecase =  new CreateCustomerUseCase(customerRepository);

        input.street = "";

        await expect(usecase.execute(input)).rejects.toThrow( "Street is required" );
      });
});