import Database from "../Database/index.js";

function PaymentRoutes(app) {
    app.get("/api/payments", (req, res) => {
        res.send(Database.payments);
    });

    app.get("/api/users/:uid/payments", (req, res) => {
        const { uid } = req.params;
        const payments = Database.payments
            .filter((p) => p.user_id === uid);
        res.send(payments);
    });

    app.delete("/api/payments/:pid", (req, res) => {
        const { pid } = req.params;
        Database.payments = Database.payments.filter((p) => p._id !== pid);
        res.sendStatus(200);
    });

    app.put("/api/payments/:pid", (req, res) => {
        const { pid } = req.params;
        const paymentIndex = Database.payments.findIndex((p) => p._id === pid);
        Database.payments[paymentIndex] = {
            ...Database.payments[paymentIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    app.post("/api/users/:uid/payments", (req, res) => {
        const { uid } = req.params;
        const newPayment = {
            ...req.body,
            user: uid,
            _id: 'payment' + new Date().getTime().toString(),
        };
        Database.payments.push(newPayment);
        res.send(newPayment);
    });
}
export default PaymentRoutes;