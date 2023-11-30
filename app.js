import express from 'express';
import UserRoutes from "./users/routes.js";
import cors from "cors";
import "dotenv/config";
import ShoppingRoutes from "./shoppingCart/routes.js";
import OrderRoutes from "./order/routes.js";


const app = express();
app.use(cors());
app.use(express.json());
UserRoutes(app);
ShoppingRoutes(app);
OrderRoutes(app);

app.listen(process.env.PORT || 4000)