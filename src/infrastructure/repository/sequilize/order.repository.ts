import Order from "../../../domain/entity/order";
import OrderItem from "../../../domain/entity/order_item";
import OrderRepositoryInterface from "../../../domain/repository/order-repository.interface";
import OrderItemModel from './order-item.model';
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {

  async create(entity: Order): Promise<void> {
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

      const updatePromises = [];

      const updateOrderPromises = OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total(),
        },
        { where: { id: entity.id } },
      );

      updatePromises.push(updateOrderPromises);

      const removeOrderItemsPromises = OrderItemModel.destroy(
        {
          where: { order_id: entity.id }
        },
      );

      updatePromises.push(removeOrderItemsPromises);

      const addOrderItemsPromises = entity.items.map((item) => {
        return OrderItemModel.create({
          id: item.id,
          product_id: item.productId,
          order_id: entity.id,
          quantity: item.quantity,
          name: item.name,
          price: item.price
        }
        );
      });
      updatePromises.push(...addOrderItemsPromises);

      await Promise.all(updatePromises);
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
