import Notification, { NotificationErrorProps } from '../notification/notification';

export default abstract class Entity{
    protected _id: string;
    protected notification: Notification;

    constructor(){
        this.notification = new Notification();
    }

    protected addError(message:string){
        this.notification.addError({
            context: this.constructor["name"].toLowerCase(),
            message: message,
        });
    }

    protected hasErrors():boolean{
        return this.notification.hasErrors();
    }

    protected getErros():NotificationErrorProps[]{
        return this.notification.errors;
    }

    get id(): string {
        return this._id;
    }
}