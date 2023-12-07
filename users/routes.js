// routes.js
import * as dao from "./dao.js";

function UserRoutes(app) {
    // User Registration
    app.post("/api/users/signup", async (req, res) => {
        const { email, password, role } = req.body;

        const existingUser = await dao.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).send('User already exists. Please sign in.');
        }

        const newUser = await dao.createUser({ email, password, role });
        req.session.user = newUser; // Store user in session
        res.status(201).json(newUser);
    });

    // User Login
    app.post("/api/users/signin", async (req, res) => {
        const { email, password } = req.body;
        const user = await dao.findUserByEmail(email);

        if (user && user.password === password) {
            req.session.user = user; // Store user in session
            res.json(user);
        } else {
            res.status(401).send('Invalid email or password');
        }
    });

    // User Logout
    app.post("/api/users/logout", (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Could not log out');
            }
            res.sendStatus(200);
        });
    });

    // Other routes...

}

export default UserRoutes;
