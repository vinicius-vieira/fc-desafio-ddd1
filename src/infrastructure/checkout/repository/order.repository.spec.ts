import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../product/repository/product.model";
import ProductRepository from "../../product/repository/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";
import CustomerModel from "../../customer/repository/customer.model";
import CustomerRepository from "../../customer/repository/customer.repository";
import OrderItem from "../../../domain/checkout/entity/order_item";
import Product from "../../../domain/product/entity/product";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import Order from "../../../domain/checkout/entity/order";


describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const idBase = "1";
    const mockData = createMockData(idBase);
    const customer = mockData[0];
    const product = mockData[1];
    const order = mockData[2]

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: idBase,
      customer_id: idBase,
      total: order.total(),
      items: [
        {
          id: order.items[0].id,
          name: order.items[0].name,
          price: order.items[0].price,
          quantity: order.items[0].quantity,
          order_id: idBase,
          product_id: idBase,
        },
      ],
    });
  });

  it("should update a order", async () => {
    const idBase = "1";
    const mockData = createMockData(idBase);
    const customer = mockData[0] as Customer;
    const productA = mockData[1] as Product;
    let order = mockData[2] as Order;

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    await productRepository.create(productA);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    let orderModel = await orderRepository.find(order.id);
    expect(order).toStrictEqual(orderModel);

    const productB =  new Product("2", 'Product 2' , 500.01);
    await productRepository.create(productB);

    const ordemItem2 = new OrderItem(
      "25",
      productB.name,
      productB.price,
      productB.id,
      1
    );

    order = new Order(orderModel.id, orderModel.customerId, [ordemItem2]);

    await orderRepository.update(order);

    orderModel = await orderRepository.find(order.id);
    expect(order).toStrictEqual(orderModel);
  });

  it("should find a order", async () => {
    const idBase = "1";
    const mockData = createMockData(idBase);
    const customer = mockData[0];
    const product =  new Product(idBase, 'Product ' + idBase , 100.01);
    const order = mockData[2]

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderResult = await orderRepository.find(order.id);

    expect(order).toStrictEqual(orderResult);
  });

  it("should throw an error when order is not found", async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find("1356");
    }).rejects.toThrow("Order not found");
  });

  it("should find all orders", async () => {

    const mockData = createMockData("1");
    const customer = mockData[0];
    const product = mockData[1];
    const order = mockData[2];

    const mockDataB = createMockData("2");
    const customerB = mockDataB[0];
    const productB = mockDataB[1];
    const orderB = mockDataB[2];

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);
    await customerRepository.create(customerB);

    const productRepository = new ProductRepository();
    await productRepository.create(product);
    await productRepository.create(productB);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(orderB);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order);
    expect(orders).toContainEqual(orderB);
  });
});

export function createMockData(id: string) : any[]{

  const customer = new Customer(id, 'Customer ' + id );
  const address = new Address('Street ' + id, 1, 'Zipcode ' + id, 'City ' + id);
  customer.changeAddress(address);

  const product = new Product(id, 'Product ' + id , 100.01);
  const orderItem = new OrderItem(
    id,
    product.name,
    product.price,
    product.id,
    1
  );
  const order = new Order(id, id, [orderItem]);

  return [customer, product, order];
}
