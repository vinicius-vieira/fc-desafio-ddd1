import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";
import CustomerModel from "../../../infrastructure/customer/repository/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/customer.repository";
import CreateCustomerUseCase from "../create/create.customer.usecase";

const customer1 = CustomerFactory.createWithAddress( "Customer 1", new Address("Street 1", 1, "Zipcode 1", "City 1") );
const customer2 = CustomerFactory.createWithAddress( "Customer 2", new Address("Street 2", 2, "Zipcode 2", "City 2") );
describe("Integration Test list customer use case", () => {

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

    afterEach(async () => {
      await sequelize.close();
    });

    it("should list all customer", async () => {

        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const usecase =  new ListCustomerUseCase(customerRepository);

        const output = await usecase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);

        expect(output.customers.length).toBe(2);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
      });

});