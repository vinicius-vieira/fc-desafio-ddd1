import {app, sequelize} from "../express";
import request from 'supertest';


describe("E2E test for customer", () => {

    beforeEach( async () =>{
        await sequelize.sync({force: true});
    })

    afterAll( async () =>{
        await sequelize.close();
    });

    it("should create a customer", async () =>{
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Customer 1",
                street: "Street 1",
                city: "City 1",
                number: 1,
                zip: "12345",
            });

        expect(response.status).toBe(200);

        expect(response.body.name).toBe("Customer 1");
        expect(response.body.address.street).toBe("Street 1");
        expect(response.body.address.city).toBe("City 1");
        expect(response.body.address.number).toBe(1);
        expect(response.body.address.zip).toBe("12345");
    });

    it("should not create a customer", async () =>{
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Customer 1",
            });

        expect(response.status).toBe(500);
    });

    it("should list all customer", async () =>{
        const response1 = await request(app)
            .post("/customer")
            .send({
                name: "Customer 1",
                street: "Street 1",
                city: "City 1",
                number: 1,
                zip: "12345",
            });

        expect(response1.status).toBe(200);

        const response2 = await request(app)
        .post("/customer")
        .send({
            name: "Customer 2",
            street: "Street 2",
            city: "City 2",
            number: 2,
            zip: "12342",
        });

        expect(response2.status).toBe(200);

        const response = await request(app)
            .get("/customer")
            .send();

        expect(response.status).toBe(200);

        expect(response.body.customers.length).toBe(2);

        const customer = response.body.customers[0];

        expect(customer.name).toBe("Customer 1");
        expect(customer.address.street).toBe("Street 1");
        expect(customer.address.city).toBe("City 1");
        expect(customer.address.number).toBe(1);
        expect(customer.address.zip).toBe("12345");

        const customer2 = response.body.customers[1];

        expect(customer2.name).toBe("Customer 2");
        expect(customer2.address.street).toBe("Street 2");
        expect(customer2.address.city).toBe("City 2");
        expect(customer2.address.number).toBe(2);
        expect(customer2.address.zip).toBe("12342");
    });
});