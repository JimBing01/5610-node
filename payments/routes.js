// import Database from "../Database/index.js";
import mongoose from "mongoose";
import Payment from "./model.js";

function PaymentRoutes(app) {
    app.get("/api/payments", async (req, res) => {
        const payments = await Payment.find();
        res.json(payments);
    }
    
    );

    app.get("/api/users/:user_id/payments", async (req, res) => {
        const { user_id } = req.params;
        const payments = await Payment.find({ user_id });
        res.json(payments);
    }
    );

    app.get("/api/payments/:pid", async (req, res) => {
        const { pid } = req.params;
        const payment = await Payment.findOne({ pid: pid });
        res.json(payment);
    }
    );

    app.delete("/api/payments/:pid", async (req, res) => {
        try {
            const { pid } = req.params;
            const deletedPayment = await Payment.findOneAndDelete({ pid: pid });
    
            if (!deletedPayment) {
                return res.status(404).send('Payment not found.');
            }
            res.sendStatus(200);
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });
    

    app.put("/api/payments/:pid", async (req, res) => {
        try {
            const { pid } = req.params;
            const updatedPaymentData = req.body;
            const updatedPayment = await Payment.findOneAndUpdate({ pid: pid }, updatedPaymentData, { new: true, runValidators: true });
    
            if (!updatedPayment) {
                return res.status(404).send('Payment not found.');
            }
            res.json(updatedPayment); // Send back the updated document
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });
    

    app.post("/api/users/:user_id/payments", async (req, res) => {
        try {
            const { user_id } = req.params;
            const pid = Date.now().toString(); // Use the current timestamp as pid
    
            const payment = new Payment({
                _id: new mongoose.Types.ObjectId(),
                pid, // Set the pid as the current timestamp
                user_id,
                ...req.body
            });
            await payment.save();
            res.status(201).send(payment);
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    });    
}

export default PaymentRoutes;
