import EventHandlerInterface from "./handler/event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {

    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: EventHandlerInterface): void;
    unRegister(eventName: string, eventHandler: EventHandlerInterface): void;
    unRegiterAll(): void;
};