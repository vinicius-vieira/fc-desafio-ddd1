export interface InputListProductDto{

}

type Product = {
    id: string;
    name: string;
    price: number;
}

export interface OutListProductDto{
    products: Product[];
}
