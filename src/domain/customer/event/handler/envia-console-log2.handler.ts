import EventHandlerInterface from '../../../@shared/event/handler/event-handler.interface';
import ProductCreatedEvent from '../customer-created.event';

export default class enviaConsoleLog2Handler implements EventHandlerInterface<ProductCreatedEvent>{

    handle(event: ProductCreatedEvent): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }

}