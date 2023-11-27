import Database from "../Database/index.js";
function UserRoutes(app) {
    app.delete("/api/users/:uid", (req, res) => {
        const { uid } = req.params;
        Database.users = Database.users.filter((u) => u._id !== uid);
        res.sendStatus(200);
    });
    app.put("/api/users/:uid", (req, res) => {
        const { uid } = req.params;
        const userIndex = Database.users.findIndex((u) => u._id === uid);
        Database.users[userIndex] = {
            ...Database.users[userIndex],
            ...req.body
        };
        res.sendStatus(204);
    });
    app.post("/api/users", (req, res) => {
        const newUser = {
            ...req.body,
            _id: 'user' + new Date().getTime().toString(),
        };
        Database.users.push(newUser);
        res.send(newUser);
    });
    app.get("/api/users", (req, res) => {
        res.send(Database.users);
    });
}