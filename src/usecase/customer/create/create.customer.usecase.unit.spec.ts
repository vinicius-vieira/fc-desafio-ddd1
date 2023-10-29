import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: "Customer 1",
  street: "Street 1",
  city: "City 1",
  number: 1,
  zip: "Zipcode 1",
}

const MockRepository = () =>{
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test create customer use case", () => {

    it("should create a customer", async () => {

        const customerRepository = MockRepository();
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

        const customerRepository = MockRepository();
        const usecase =  new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow( "Name is required" );
      });

      it("should throw an error when streat is missing", async () => {

        const customerRepository = MockRepository();
        const usecase =  new CreateCustomerUseCase(customerRepository);

        input.street = "";

        await expect(usecase.execute(input)).rejects.toThrow( "Street is required" );
      });
});