import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputFindCustomerDto, OutFindCustomerDto } from "./find.customer.dto";

export default class FindCustomerUseCase{
    private customerRepository: CustomerRepositoryInterface;

    constructor(csr: CustomerRepositoryInterface) {
        this.customerRepository = csr;
    }

    async execute(input: InputFindCustomerDto): Promise<OutFindCustomerDto>{
        const customer = await this.customerRepository.find(input.id);

        return{
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                number: customer.address.number,
                zip: customer.address.zip,
            },
        };
    }
}