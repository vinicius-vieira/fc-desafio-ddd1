import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import Address from '../../../domain/customer/value-object/address';
import { InputCreateCustomerDto, OutputCreateCustomerDto } from './create.customer.dto';

export default class CreateCustomerUseCase{
    private customerRepository: CustomerRepositoryInterface;

    constructor(cst : CustomerRepositoryInterface){
        this.customerRepository = cst;
    }

    async execute(input : InputCreateCustomerDto) : Promise<OutputCreateCustomerDto>{

        const customer = CustomerFactory.createWithAddress(input.name, new Address(input.street, input.number, input.zip, input.city) );

        await this.customerRepository.create( customer );

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                number: customer.address.number,
                zip: customer.address.zip,
            },
        }
    }
}