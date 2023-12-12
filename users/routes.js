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

    //yiming
    app.get("/api/users", (req, res) => {
        if (req.query.email) {
            const userExists = Database.users.some(u => u.email === req.query.email);
            res.json({ exists: userExists });
        } else {
            res.json(Database.users);
        }
    });

    app.get("/api/users/:uid", (req, res) => {
        const { uid } = req.params;
        const user = Database.users.find((u) => u._id === uid);
        res.send(user);
    });


    // app.get("/api/users", (req, res) => {
    //     console.log("Checking if user exists with email:", req.query.email);
    //     const userExists = Database.users.some(u => u.email === req.query.email);
    //     console.log("User exists:", userExists);
    //     res.send(userExists ? [req.query.email] : []);
    // });


    app.post("/api/users", (req, res) => {
        const newUser = {
            ...req.body,
            _id: 'user' + new Date().getTime().toString(),
        };
        Database.users.push(newUser);
        res.send(newUser);
    });

    // app.get("/api/users", (req, res) => {
    //     res.send(Database.users);
    // });



    // app.post('/api/users/signin', (req, res) => {
    //     // Replace this with your actual user authentication logic
    //     const user = Database.users.find(u => u.email === req.body.email && u.password === req.body.password);
    //     if (user) {
    //         req.session.userId = user._id; // Store the user ID in the session
    //         res.json(user);
    //     } else {
    //         res.status(401).json({ message: 'Invalid credentials' });
    //     }
    // });

    app.post('/api/users/signin', (req, res) => {
        console.log("Attempting to sign in user:", req.body.email);
        const user = Database.users.find(u =>
                                             u.email.toLowerCase() === req.body.email.toLowerCase() &&
                                             u.password === req.body.password
        );
        if (user) {
            console.log("Sign in successful for user:", req.body.email);
            req.session.userId = user._id; // Store the user ID in the session
            res.json(user);
        } else {
            console.log("Sign in failed for user:", req.body.email);
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });


    app.post('/api/users/signout', (req, res) => {
        req.session.destroy(); // Destroy the session
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.json({ message: 'You have been signed out' });
    });

     

}


export default UserRoutes;