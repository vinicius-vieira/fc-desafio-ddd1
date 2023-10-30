import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup";

export default class ProductYupValidator implements ValidatorInterface<Product>{

    validate(entity: Product): void {
        try {
            yup.object()
            .shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                price: yup.number()
                            .transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value)
                            .positive("Price must be greater than zero")
            })
            .validateSync(
                {
                    id: entity.id,
                    name: entity.name,
                    price: entity.price,
                },
                {
                    abortEarly: false,
                }
            );
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach( (error) => entity.addError(error) );
        }
    }

}