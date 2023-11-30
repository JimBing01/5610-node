import db from "../Database/index.js";

function OrderRoutes(app) {

    app.get("/user/:userId/pastOrders", (req, res) => {
        const { userId } = req.params;
        const pastOrders = db.customerOrder.filter((m) => m.userId === userId);
        console.log(pastOrders)
        res.send(pastOrders);

    });
}
export default OrderRoutes;