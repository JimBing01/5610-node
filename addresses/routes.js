import Database from "../Database/index.js";

function AddressRoutes(app) {

    const getUserAddresses = (uid) => Database.addresses.filter(a => a.userId === uid);

    app.get("/api/addresses", (req, res) => {
        res.send(Database.addresses);
    });

    app.get("/api/users/:uid/addresses", (req, res) => {
        const { uid } = req.params;
        res.send(getUserAddresses(uid));
    });

    app.get("/api/users/:uid/addresses/:aid", (req, res) => {
        const { uid, aid } = req.params;
        const userAddresses = getUserAddresses(uid);
        const address = userAddresses.find(a => a.addressId === aid);
        res.send(address);
    }
    
        );

    app.delete("/api/addresses/:aid", (req, res) => {
        const { aid } = req.params;
        Database.addresses = Database.addresses.filter(a => a.addressId !== aid);
        res.sendStatus(200);
    });

    app.put("/api/addresses/:aid", (req, res) => {
        const { aid } = req.params;
        const addressIndex = Database.addresses.findIndex(a => a.addressId === aid);
        if (addressIndex !== -1) {
            Database.addresses[addressIndex] = { ...Database.addresses[addressIndex], ...req.body };
            res.sendStatus(204);
        } else {
            res.sendStatus(404); // Address not found
        }
    });

    app.get("/api/addresses/:aid", (req, res) => {
        const { aid } = req.params;
        const address = Database.addresses.find(a => a.addressId === aid);
        res.send(address);
    });

    app.post("/api/users/:uid/addresses", (req, res) => {
        const { uid } = req.params;
        const newAddress = {
            ...req.body,
            userId: uid,
            _id: `address${new Date().getTime()}`,
        };
        Database.addresses.push(newAddress);
        res.status(201).send(newAddress); // 201 for resource creation
    });

}

export default AddressRoutes;
