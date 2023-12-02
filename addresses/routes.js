import Database from "../Database/index.js";

function AddressRoutes(app) {
    app.get("/api/addresses", (req, res) => {
        res.send(Database.addresses);
    }
    );

    app.get("/api/users/:uid/addresses", (req, res) => {
        const { uid } = req.params;
        const addresses = Database.addresses
            .filter((a) => a.userId === uid);
        res.send(addresses);
    }
);

    app.delete("/api/addresses/:aid", (req, res) => {
        const { aid } = req.params;
        Database.addresses = Database.addresses.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });

    app.put("/api/addresses/:aid", (req, res) => {
        const { aid } = req.params;
        const addressIndex = Database.addresses.findIndex((a) => a._id === aid);
        Database.addresses[addressIndex] = {
            ...Database.addresses[addressIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    app.post("/api/users/:uid/addresses", (req, res) => {
        const { uid } = req.params;
        const newAddress = {
            ...req.body,
            user: uid,
            _id: 'address' + new Date().getTime().toString(),
        };
        Database.addresses.push(newAddress);
        res.send(newAddress);
    });

    app.get("/api/users/:uid/addresses", (req, res) => {
        const { uid } = req.params;
        const addresses = Database.addresses
            .filter((a) => a.user === uid);
        res.send(addresses);
    });
}
export default AddressRoutes;