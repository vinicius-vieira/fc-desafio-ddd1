import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";
import CustomerModel from "../../../infrastructure/customer/repository/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/customer.repository";

const customer = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 1, "Zipcode 1", "City 1"));

const input = {
  id: customer.id,
  name: "Customer Updated",
  street: "Street Updated",
  city: "City Updated",
  number: 1234,
  zip: "Zipcode Updated",
}

const MockRepository = () =>{
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
}

describe("Integration Test update customer use case", () => {
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

    it("should update a customer", async () => {

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const usecase =  new UpdateCustomerUseCase(customerRepository);

        const output = await usecase.execute(input);

        expect({
          id: output.id,
          name: output.name,
          street: output.address.street,
          number: output.address.number,
          zip: output.address.zip,
          city: output.address.city,
         }).toEqual(input);
      });
});