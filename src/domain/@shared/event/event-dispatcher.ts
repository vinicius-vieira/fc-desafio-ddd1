import EventHandlerInterface from "./handler/event-handler.interface";
import EventInterface from "./event.interface";
import EventDispatcherInterface from "./event-dispatcher.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: { [eventName: string]: EventHandlerInterface[]} = {};

    get getEventHandlers():{[eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;

        if(this.getHandlers(eventName)){
            this.getHandlers(eventName).forEach( eventHandler => { 
                eventHandler.handle(event); 
            } );
        }
    }

    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if(!this.getHandlers(eventName)){
            this.eventHandlers[eventName] = [];
        }
        this.getHandlers(eventName).push(eventHandler);
    }

    unRegister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if(this.getHandlers(eventName)){

            const index = this.getHandlers(eventName).indexOf(eventHandler);

           if(index!=-1){
            this.getHandlers(eventName).splice(index,1);
           }
        }
    }

    unRegiterAll(): void {
        this.eventHandlers = {};
    }

    private getHandlers(eventName: string) {
        return this.eventHandlers[eventName];
    }

};