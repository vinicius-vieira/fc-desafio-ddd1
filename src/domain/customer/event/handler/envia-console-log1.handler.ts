import EventHandlerInterface from '../../../@shared/event/handler/event-handler.interface';
import ProductCreatedEvent from '../customer-created.event';

export default class EnviaConsoleLog1Handler implements EventHandlerInterface<ProductCreatedEvent>{

    handle(event: ProductCreatedEvent): void {
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    }

}