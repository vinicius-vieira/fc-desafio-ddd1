import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import enviaConsoleLog2Handler from "./handler/envia-console-log2.handler";

describe('Customer creation notification', () => {

    it('should notify customer creation.', () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new enviaConsoleLog2Handler();
        const spyEventHandle1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandle2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "1",
            name: "Cliente 1"
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandle1).toHaveBeenCalled();
        expect(spyEventHandle2).toHaveBeenCalled();
    });
});