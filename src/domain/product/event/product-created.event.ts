import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface{
    dataTimeOcurred: Date;
    enventData: any;

    constructor(eventData: any){
        this.dataTimeOcurred = new Date();
        this.enventData = eventData;
    }
}