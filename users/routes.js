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
    
    app.get("/api/users/:uid", (req, res) => {
        const { uid } = req.params;
        const user = Database.users.find((u) => u._id === uid);
        res.send(user);
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


    //yiming
    app.post("/api/users/signout", (req, res) => {
        // If you have session management, you would destroy the session here.
        // Since it's not shown in your current code, we'll just send a confirmation response.

        // If you're using something like express-session, it might look like this:
        // req.session.destroy();

        res.status(200).send({ message: "Sign-out successful" });
    });

}


export default UserRoutes;