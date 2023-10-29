export interface InputListCustomerDto{

}

type Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zip: string;
    };
}

export interface OutListCustomerDto{
    customers: Customer[];
}
