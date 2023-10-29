import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase{
    private customerRepository: CustomerRepositoryInterface;

    constructor(csr: CustomerRepositoryInterface) {
        this.customerRepository = csr;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto>{
        const customer = await this.customerRepository.find(input.id);
        customer.changeName(input.name);
        customer.changeAddress( new Address(input.street, input.number, input.zip, input.city) );

        await this.customerRepository.update(customer);

        return {
            id: customer.id,
            name: customer.name,
            address:{
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city,
            }
        };
    }
}