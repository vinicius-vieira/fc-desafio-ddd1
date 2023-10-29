import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

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

describe("Unit Test update customer use case", () => {

    it("should update a customer", async () => {

        const customerRepository = MockRepository();
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