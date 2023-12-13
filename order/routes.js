import db from "../Database/index.js";
import * as dao from "./dao.js";


function OrderRoutes(app) {

    app.get("/user/:userId/pastOrders", async (req, res) => {
        const { userId } = req.params;
        const pastOrders = await dao.findPastOrders(userId);

        res.send(pastOrders);

    });

    app.put("/user/:userId/pastOrders", async (req, res) => {
        const { userId } = req.params;
        const pastOrder = req.body;

        const orderIndex = await dao.updatePastOrder(pastOrder._id,pastOrder)

        res.sendStatus(204);
    });

    app.get("/restaurant/pastOrders",async (req, res) => {

        const pastOrders = await dao.findAll();

        res.send(pastOrders);

    });

    app.put("/restaurant/pastOrders", async (req, res) => {
        const pastOrder = req.body;
        await dao.updatePastOrder(pastOrder._id,pastOrder)

        res.sendStatus(204);
    });


}
export default OrderRoutes;