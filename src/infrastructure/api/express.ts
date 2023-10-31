import express, { Express } from "express";
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from "../customer/repository/customer.model";
import { customerRoute } from "./routes/customer.route";
import { productRoute } from "./routes/product.route";
import ProductModel from "../product/repository/product.model";

export const app: Express = express();

app.use(express.json());
app.use("/customer", customerRoute);
app.use("/product", productRoute);

export let sequelize:Sequelize;

async function setupDb() {

    sequelize = new Sequelize({
          dialect: "sqlite",
          storage: ":memory:",
          logging: false,
          sync: { force: true },
        });

    await sequelize.addModels([
        CustomerModel,
        ProductModel
    ]);
    await sequelize.sync();
}

setupDb();