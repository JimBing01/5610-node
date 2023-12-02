import Database from "../Database/index.js";
// import fs from 'fs';
// import path from 'path';

// function writeToJSONFile(users) {
//     fs.writeFileSync(path.resolve(__dirname, '../Database/users.json'), JSON.stringify(users, null, 2));
// }

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

    // app.post("/api/users", (req, res) => {
    //     const newUser = { ...req.body, _id: 'user' + new Date().getTime().toString() };
    //     Database.users.push(newUser);
    //     writeToJSONFile(Database.users); // Write to file
    //     res.send(newUser);
    // });

}


export default UserRoutes;