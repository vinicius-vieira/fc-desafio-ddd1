import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutFindProductDto } from "./find.product.dto";

export default class FindProductUseCase{
    private productRepository: ProductRepositoryInterface;

    constructor(csr: ProductRepositoryInterface) {
        this.productRepository = csr;
    }

    async execute(input: InputFindProductDto): Promise<OutFindProductDto>{
        const product = await this.productRepository.find(input.id);

        return{
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}