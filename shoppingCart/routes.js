import db from "../Database/index.js";

function ShoppingRoutes(app) {

    app.get("/user/:userId/shopping-cart", (req, res) => {
        const { userId } = req.params;
        const shoppingCart = db.shoppingCart.filter((m) => m.userId === userId);
        res.send(shoppingCart);

    });

    app.post("/user/:userId/shopping-cart", (req, res) => {
        const { userId } = req.params;
        const user = db.users.find((m) => m._id === userId);
        const pastOrder = {
            ...req.body,"userName": user.username,
        };
        db.customerOrder.push(pastOrder);

        res.send(db.customerOrder.filter((m) => m.userId === userId));

    });

    app.get("/user/:userId/shopping-cart/pastOrders", (req, res) => {
        const { userId } = req.params;
        const pastOrders = db.customerOrder.filter((m) => m.userId === userId);
        res.send(pastOrders);

    });
}
export default ShoppingRoutes;