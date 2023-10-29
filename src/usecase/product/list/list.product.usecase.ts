import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutListProductDto } from "./list.product.dto";


export default class ListProductUseCase{
    private productRepository: ProductRepositoryInterface;

    constructor(pri: ProductRepositoryInterface) {
        this.productRepository = pri;
    }

    async execute(input: InputListProductDto): Promise<OutListProductDto>{
        const products = await this.productRepository.findAll();

        return OutputMapper.toOutput(products);
    }
}

class OutputMapper{
    static toOutput(product: Product[]): OutListProductDto{
        return {
            products: product.map( (product)=> ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        }
    }
}