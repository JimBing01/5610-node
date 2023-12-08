import express from 'express';
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


const app = express();

app.use(cors());
app.use(express.json());

SandwichReviews(app);
SandwichRoutes(app) 
UserRoutes(app);
ShoppingRoutes(app);
OrderRoutes(app);
HomeRoutes(app);
SearchBarRoutes(app);
AddressRoutes(app);
PaymentRoutes(app);



app.listen(process.env.PORT || 4000)
// app.listen(4000, () => {
//     console.log('Server is running on port 4000');
// });