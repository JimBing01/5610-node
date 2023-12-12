import Database from "../Database/index.js";

function PaymentRoutes(app) {
    app.get("/api/payments", (req, res) => {
        res.json(Database.payments);
    });

    app.get("/api/users/:user_id/payments", (req, res) => {
        const { user_id } = req.params;
        const userPayments = Database.payments.filter(payment => payment.user_id === user_id);

        res.json(userPayments);
    });

    app.get("/api/payments/:pid", (req, res) => {
        const { pid } = req.params;
        const payment = Database.payments.find(payment => payment.pid === pid);

        if (!payment) {
            return res.status(404).send('Payment not found.');
        }
        res.json(payment);
    }
    );

    app.delete("/api/payments/:pid", (req, res) => {
        const { pid } = req.params;
        const paymentExists = Database.payments.some(payment => payment.pid === pid);

        if (!paymentExists) {
            return res.status(404).send('Payment not found.');
        }

        Database.payments = Database.payments.filter(payment => payment.pid !== pid);
        res.status(200).send('Payment deleted successfully.');
    });

    app.put("/api/payments/:pid", (req, res) => {
        const { pid } = req.params;
        const paymentIndex = Database.payments.findIndex(payment => payment.pid === pid);

        if (paymentIndex === -1) {
            return res.status(404).send('Payment not found.');
        }

        Database.payments[paymentIndex] = {
            ...Database.payments[paymentIndex],
            ...req.body
        };
        res.status(204).send();
    });

    app.post("/api/users/:user_id/payments", (req, res) => {
        const { user_id } = req.params;
        const newPayment = {
            ...req.body,
            user_id,
            pid: 'payment' + new Date().getTime().toString(),
        };

        Database.payments.push(newPayment);
        res.status(201).json(newPayment);
    });
}

export default PaymentRoutes;
