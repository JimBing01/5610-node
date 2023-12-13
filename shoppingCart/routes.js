import db from "../Database/index.js";
import * as dao from "./dao.js";
import Address from "../addresses/model.js";
import User from '../users/schema.js';
import * as daoOrder from "../order/dao.js";
import {ObjectId} from "bson";


function ShoppingRoutes(app) {
    const getShoppingCart = async (req, res) => {
        const { userId } = req.params;
        const shoppingCart = await dao.findShoppingCart(userId);
        res.send(shoppingCart);
    };

    app.get("/user/:userId/shopping-cart", getShoppingCart);


    const postShoppingCart = async (req, res) => {
        const { userId } = req.params;
        console.log(userId)
        const user = await User.findById(userId);
        console.log(user)
        const pastOrder = {
            ...req.body,"userName": user.username,
        };
        await daoOrder.createPastOrder(pastOrder);
        await dao.excludeShoppingCart(userId)
        const pastOrders = await daoOrder.findPastOrders(userId)
        console.log(pastOrders)
        res.send(pastOrders);
    };
    app.post("/user/:userId/shopping-cart", postShoppingCart);

    app.get("/user/:userId/shopping-cart/pastOrders", async (req, res) => {
        const { userId } = req.params;
        const pastOrders = await daoOrder.findPastOrders(userId);
        res.send(pastOrders);

    });

    const deleteShoppingCart = async (req, res) => {
        const { orderId } = req.params;
        await dao.deleteShoppingCart(orderId)

        res.sendStatus(200);
    };
    app.delete("/user/:userId/shopping-cart/:orderId", deleteShoppingCart);

    const updateShoppingCart = async (req, res) => {
        const { orderId } = req.params;

        dao.updateShoppingCart(orderId,req.body)
        res.sendStatus(200);
    };
    app.put("/user/:userId/shopping-cart/:orderId", updateShoppingCart);

    app.get("/user/:userId/shopping-cart/addresses", async (req, res) => {
        const { userId } = req.params;
        const addresses = await Address.find({userId:userId})
        res.send(addresses);
    });
}
export default ShoppingRoutes;