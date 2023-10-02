import EventDispatcher from "../@shared/event-dispatcher";
import CustomerChangeAddressEvent from "./customer-change-address.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";


describe('Customer changed address notification', () => {

    it('should notify when customer address changed.', () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandle = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);

        const customerChangeAddressEvent = new CustomerChangeAddressEvent({
            id: "1",
            name: "Cliente 1",
            enderesso: "Rua 1 - N1, Cidade, Pais",
        });

        eventDispatcher.notify(customerChangeAddressEvent);
        expect(spyEventHandle).toHaveBeenCalled();
    });
});