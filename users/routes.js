// import Database from "../Database/index.js";
//
// function UserRoutes(app) {
//     app.delete("/api/users/:uid", (req, res) => {
//         const { uid } = req.params;
//         Database.users = Database.users.filter((u) => u._id !== uid);
//         res.sendStatus(200);
//     });
//
//     app.put("/api/users/:uid", (req, res) => {
//         const { uid } = req.params;
//         const userIndex = Database.users.findIndex((u) => u._id === uid);
//         Database.users[userIndex] = {
//             ...Database.users[userIndex],
//             ...req.body
//         };
//         res.sendStatus(204);
//     });
//
//
//     app.get("/api/users", (req, res) => {
//         if (req.query.email) {
//             const userExists = Database.users.some(u => u.email === req.query.email);
//             res.json({ exists: userExists });
//         } else {
//             res.json(Database.users);
//         }
//     });
//
//     app.get("/api/users/:uid", (req, res) => {
//         const { uid } = req.params;
//         const user = Database.users.find((u) => u._id === uid);
//         res.send(user);
//     });
//
//
//     app.post("/api/users", (req, res) => {
//         const newUser = {
//             ...req.body,
//             _id: 'user' + new Date().getTime().toString(),
//         };
//         Database.users.push(newUser);
//         res.send(newUser);
//     });
//
//     // app.get("/api/users", (req, res) => {
//     //     res.send(Database.users);
//     // });
//
//
//     app.post('/api/users/signin', (req, res) => {
//         console.log("Attempting to sign in user:", req.body.email);
//         const user = Database.users.find(u =>
//                                              u.email.toLowerCase() === req.body.email.toLowerCase() &&
//                                              u.password === req.body.password
//         );
//         if (user) {
//             console.log("Sign in successful for user:", req.body.email);
//             req.session.userId = user._id; // Store the user ID in the session
//             res.json(user);
//         } else {
//             console.log("Sign in failed for user:", req.body.email);
//             res.status(401).json({ message: 'Invalid credentials' });
//         }
//     });
//
//
//     app.post('/api/users/signout', (req, res) => {
//         req.session.destroy(); // Destroy the session
//         res.clearCookie('connect.sid'); // Clear the session cookie
//         res.json({ message: 'You have been signed out' });
//     });
//
//     app.post('/api/users/signup', (req, res) => {
//         // Destructure and validate required fields
//         const { email, password, firstName, lastName, username, dob, phone, role } = req.body;
//
//         // Check if the user already exists
//         const existingUser = Database.users.find(u => u.email === email);
//         if (existingUser) {
//             return res.status(409).send({ message: "Email already exists." });
//         }
//
//         // Create and store the new user
//         const newUser = {
//             _id: `user_${new Date().getTime()}`,
//             email, password, // In production, hash the password before storing it
//             firstName, lastName, username, dob, phone, role
//         };
//         Database.users.push(newUser);
//
//         // Respond with the newly created user
//         res.status(201).send(newUser);
//     });
//
// }
//
//
// export default UserRoutes;

// users/routes.js
// import express from 'express';
// import * as dao from './dao.js';
//
// const router = express.Router();
//
// // POST: Create a new user
// router.post('/signup', async (req, res) => {
//     try {
//         const { username, email } = req.body;
//         // Check if the user already exists by username or email
//         const existingUserByUsername = await dao.findUserByUsername(username);
//         const existingUserByEmail = await dao.findUserByEmail(email);
//         if (existingUserByUsername || existingUserByEmail) {
//             return res.status(409).send({ message: "User already exists." });
//         }
//         // Create new user
//         const newUser = await dao.createUser(req.body);
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
//
// // POST: Login a user
// router.post('/signin', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await dao.findUserByCredentials(username, password);
//         if (user) {
//             req.session.userId = user._id; // assuming you have session set up
//             res.json(user);
//         } else {
//             res.status(401).json({ message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
//
// // GET: Retrieve all users
// router.get('/', async (req, res) => {
//     try {
//         const users = await dao.findAllUsers();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
//
// // GET: Retrieve a single user by ID
// router.get('/:userId', async (req, res) => {
//     try {
//         const user = await dao.findUserById(req.params.userId);
//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
//
// // PUT: Update a user by ID
// router.put('/:userId', async (req, res) => {
//     try {
//         const updatedUser = await dao.updateUser(req.params.userId, req.body);
//         res.json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
//
// // DELETE: Remove a user by ID
// router.delete('/:userId', async (req, res) => {
//     try {
//         await dao.deleteUser(req.params.userId);
//         res.status(200).json({ message: 'User successfully deleted' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
//
// // POST: Logout the current user
// router.post('/signout', (req, res) => {
//     req.session.destroy();
//     res.clearCookie('connect.sid'); // assuming you have cookie set up
//     res.json({ message: 'User successfully signed out' });
// });
//
// export default router;

// users/routes.js
import User from './schema.js'; // Import the User model you created based on the schema

function UserRoutes(app) {
    app.delete("/api/users/:uid", async (req, res) => {
        try {
            const { uid } = req.params;
            await User.deleteOne({ _id: uid });
            res.sendStatus(200);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.put("/api/users/:uid", async (req, res) => {
        try {
            const { uid } = req.params;
            const updatedUser = await User.findByIdAndUpdate(uid, req.body, { new: true });
            res.status(200).send(updatedUser);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.get("/api/users", async (req, res) => {
        try {
            if (req.query.email) {
                const userExists = await User.exists({ email: req.query.email });
                res.json({ exists: userExists });
            } else {
                const users = await User.find();
                res.json(users);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.get("/api/users/:uid", async (req, res) => {
        try {
            const { uid } = req.params;
            const user = await User.findById(uid);
            if (user) {
                res.send(user);
            } else {
                res.status(404).send({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.post("/api/users", async (req, res) => {
        try {
            const newUser = new User(req.body);
            const savedUser = await newUser.save();
            res.status(201).send(savedUser);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.post('/api/users/signin', async (req, res) => {
        try {
            const user = await User.findOne({
                                                email: req.body.email,
                                                password: req.body.password // Remember to hash the password in production
                                            });
            if (user) {
                req.session.userId = user._id; // Store the user ID in the session
                res.json(user);
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.post('/api/users/signout', (req, res) => {
        req.session.destroy(); // Destroy the session
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.json({ message: 'You have been signed out' });
    });

    app.post('/api/users/signup', async (req, res) => {
        try {
            const { email, password, firstName, lastName, username, dob, phone, role } = req.body;
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                res.status(409).send({ message: "Email already exists." });
            } else {
                const newUser = new User({ email, password, firstName, lastName, username, dob, phone, role });
                const savedUser = await newUser.save();
                res.status(201).send(savedUser);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

export default UserRoutes;
