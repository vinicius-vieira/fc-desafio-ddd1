import EventHandlerInterface from '../../@shared/event-handler.interface';
import CustomerUpdatedEvent from '../customer-change-address.event';

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerUpdatedEvent>{

    handle(event: CustomerUpdatedEvent): void {
        console.log(`Endereço do cliente: {id}, {name} alterado para: {address}`);
    }

}