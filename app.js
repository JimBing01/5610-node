import express from 'express';
import session from 'express-session';
import cors from "cors";
import "dotenv/config";
import UserRoutes from "./users/routes.js";
import ShoppingRoutes from "./shoppingCart/routes.js";
import OrderRoutes from "./order/routes.js";
import HomeRoutes from "./home/routes.js";
import SearchBarRoutes from "./SearchBar/routes.js";
import AddressRoutes from './addresses/routes.js';
import PaymentRoutes from './payments/routes.js';
import SandwichRoutes from './sandwiches/routes.js';
import SandwichReviews from './sandwiches/reviews/routes.js';
import PublicUserRoutes from './users/publicUser/routes.js';
import FavoritesRoutes from './favorites/routes.js';
// import "dotenv/config";
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/website'
mongoose.connect(CONNECTION_STRING);

const app = express();

// app.use(cors());
app.use(cors({
                 credentials: true,
                 origin: process.env.FRONTEND_URL // Replace with your actual Netlify domain
             }));



// Set up the session middleware
app.use(session({
                    secret: "any string",
                    resave: false,
                    saveUninitialized: false,
                    cookie: {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production', // Set to true if using https
                        sameSite: 'strict',
                    }
                }));

app.use(express.json());

HomeRoutes(app);
PublicUserRoutes(app);
SandwichReviews(app);
SandwichRoutes(app) 
UserRoutes(app);
ShoppingRoutes(app);
OrderRoutes(app);
SearchBarRoutes(app);
AddressRoutes(app);
PaymentRoutes(app);
FavoritesRoutes(app);

app.listen(process.env.PORT || 4000)
