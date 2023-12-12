// import Database from "../Database/index.js";
import mongoose from "mongoose";
import Address from "./model.js";

function AddressRoutes(app) {

    // Get all addresses
    app.get("/api/addresses", async (req, res) => {
        try {
            const addresses = await Address.find();
            res.send(addresses);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // Get all addresses for a user
    app.get("/api/users/:uid/addresses", async (req, res) => {
        const { uid } = req.params; // uid is received as a string here
        try {
            const userAddresses = await Address.find({ userId: uid });
            console.log("User Addresses:", userAddresses); 
            res.send(userAddresses);
        } catch (error) {
            res.status(500).send(error);
        }
        console.log("Requested UID:", uid, "Type:", typeof uid);

    });
    

    // Get a specific address for a user
    app.get("/api/users/:uid/addresses/:aid", async (req, res) => {
        const { uid, aid } = req.params;
        try {
            const address = await Address.findOne({ userId: uid, addressId: aid });
            if (address) {
                res.send(address);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // Delete an address
    app.delete("/api/addresses/:aid", async (req, res) => {
        const { aid } = req.params;
        try {
            const result = await Address.deleteOne({ addressId: aid });
            if (result.deletedCount > 0) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // Update an address
    app.put("/api/addresses/:aid", async (req, res) => {
        const { aid } = req.params;
        const updateData = req.body;

        try {
            const result = await Address.updateOne({ addressId: aid }, updateData);

            if (result.nModified > 0) {
                res.status(200).send({ message: "Address updated successfully" });
            } else if (result.matchedCount > 0) {
                res.status(200).send({ message: "No changes detected or address already up-to-date" });
            } else {
                res.status(404).send({ message: "Address not found" });
            }
        } catch (error) {
            res.status(500).send({ message: "Error updating address", error: error });
        }
    });

    // Get a specific address
    app.get("/api/addresses/:aid", async (req, res) => {
        const { aid } = req.params;
        try {
            const address = await Address.findOne({ addressId: aid });
            if (address) {
                res.send(address);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // Create a new address for a user
    app.post("/api/users/:uid/addresses", async (req, res) => {
        const { uid } = req.params;
        try {
            // Generate a unique addressId, for example using a timestamp or a MongoDB ObjectId
            const addressId = new mongoose.Types.ObjectId().toString();
    
            const newAddress = new Address({
                ...req.body,
                userId: uid,
                addressId: addressId, // Assign the generated addressId
                _id: new mongoose.Types.ObjectId() // MongoDB's ObjectId for the document's primary key (_id)
            });
    
            await newAddress.save();
            res.status(201).send(newAddress);
        } catch (error) {
            res.status(500).send(error);
        }
    });

}

export default AddressRoutes;