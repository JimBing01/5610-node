import express from 'express';
import session from 'express-session';
import UserRoutes from "./users/routes.js";
import cors from "cors";
import "dotenv/config";
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
import "dotenv/config";


const app = express();

//app.use(cors());
app.use(cors({
                 origin: process.env.FRONTEND_URL, // Replace with your actual Netlify domain
                 credentials: true,
             }));



// Set up the session middleware
app.use(session({
                    secret: process.env.SESSION_SECRET || 'a_super_secret_string', // Use an environment variable for the secret in production
                    resave: false,
                    saveUninitialized: true,
                    cookie: {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production', // Set to true if using https
                        sameSite: 'strict',
                    }
                }));

app.use(express.json());

PublicUserRoutes(app);
SandwichReviews(app);
SandwichRoutes(app) 
UserRoutes(app);
ShoppingRoutes(app);
OrderRoutes(app);
HomeRoutes(app);
SearchBarRoutes(app);
AddressRoutes(app);
PaymentRoutes(app);
FavoritesRoutes(app);



app.listen(process.env.PORT || 4000)
// app.listen(4000, () => {
//     console.log('Server is running on port 4000');
// });