import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import ProductInterface from './product.interface';
export default class Product extends Entity implements ProductInterface{
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      this.addError("Id is required");
    }
    if (this._name.length === 0) {
      this.addError("Name is required");
    }
    if (this._price < 0) {
      this.addError("Price must be greater than zero");
    }

    if(this.hasErrors()){
      throw new NotificationError(this.getErros());
    }
  }
}