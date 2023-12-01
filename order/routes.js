import db from "../Database/index.js";

function OrderRoutes(app) {

    app.get("/user/:userId/pastOrders", (req, res) => {
        const { userId } = req.params;
        const pastOrders = db.customerOrder.filter((m) => m.userId === userId);

        res.send(pastOrders);

    });

    app.put("/user/:userId/pastOrders", (req, res) => {
        const { userId } = req.params;
        const pastOrder = req.body;

        const orderIndex = db.customerOrder.findIndex(
            (m) => m._id === pastOrder._id);

        db.customerOrder[orderIndex] = {
            ...db.customerOrder[orderIndex],
            ...req.body
        };

        res.sendStatus(204);
    });
}
export default OrderRoutes;