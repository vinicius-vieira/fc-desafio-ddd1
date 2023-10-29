import express, {Request, Response} from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/customer.repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';

export const customerRoute = express.Router();

customerRoute.post( "/",  async (req: Request, res: Response) => {

    const usecase = new CreateCustomerUseCase( new CustomerRepository());

    try {
        const customerDto = {
            name: req.body.name,
            street: req.body.street,
            city: req.body.city,
            number: req.body.number,
            zip: req.body.zip,
        };

        const output = await usecase.execute(customerDto);
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});

customerRoute.get( "/",  async (req: Request, res: Response) => {

    const usecase = new ListCustomerUseCase( new CustomerRepository());

    try {
        const output = await usecase.execute({});
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }
});