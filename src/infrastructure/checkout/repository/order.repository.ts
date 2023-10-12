import Order from '../../../domain/checkout/entity/order';
import OrderRepositoryInterface from '../../../domain/checkout/repository/order-repository.interface';
import OrderItemModel from './order-item.model';
import OrderModel from "./order.model";
import OrderItem from '../../../domain/checkout/entity/order_item';

export default class OrderRepository implements OrderRepositoryInterface {

  async create(entity: Order): Promise<void> {
    logging: console.log,
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {

    try{

      await OrderModel.update(
        {
          total: entity.total(),
        },
        {
          where: { id: entity.id }
        },
      );

      await OrderItemModel.destroy(
        {
          where: { order_id: entity.id }
        },
      );

      await OrderItemModel.bulkCreate(entity.items.map((item) => {
        return {
          id: item.id,
          product_id: item.productId,
          order_id: entity.id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
        }
      }));

    }catch (e) {
      console.log('error updating user:', e);
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const itens = orderModel.items.map( (i) : OrderItem =>
      new OrderItem(
        i.id,
        i.name,
        i.price,
        i.product_id,
        i.quantity)
    );

    const order = new Order(orderModel.id, orderModel.customer_id, itens );

    return order;
  }

  async findAll(): Promise<Order[]> {

    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
  });

    const orders = orderModels.map((orderModel) => {
      const itens = orderModel.items.map( (i) : OrderItem =>
      new OrderItem(
        i.id,
        i.name,
        i.price,
        i.product_id,
        i.quantity)
    );
     return new Order(orderModel.id, orderModel.customer_id, itens );
    });

    return orders;
  }
}
