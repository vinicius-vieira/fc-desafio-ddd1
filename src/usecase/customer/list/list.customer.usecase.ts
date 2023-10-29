import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase{
    private customerRepository: CustomerRepositoryInterface;

    constructor(csr: CustomerRepositoryInterface) {
        this.customerRepository = csr;
    }

    async execute(input: InputListCustomerDto): Promise<OutListCustomerDto>{
        const customers = await this.customerRepository.findAll();

        return OutputMapper.toOutput(customers);
    }
}

class OutputMapper{
    static toOutput(customer: Customer[]): OutListCustomerDto{
        return {
            customers: customer.map( (customer)=> ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    city: customer.address.city,
                    number: customer.address.number,
                    zip: customer.address.zip,
                }
            })),
        }
    }
}