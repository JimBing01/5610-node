import express from 'express';
import UserRoutes from "./users/routes.js";
import cors from "cors";
import "dotenv/config";
import ShoppingRoutes from "./shoppingCart/routes.js";
import OrderRoutes from "./order/routes.js";
import HomeRoutes from "./home/routes.js";
import SearchBarRoutes from "./SearchBar/routes.js";


const app = express();
app.use(cors());
app.use(express.json());
UserRoutes(app);
ShoppingRoutes(app);
OrderRoutes(app);
HomeRoutes(app);
SearchBarRoutes(app);

app.listen(process.env.PORT || 4000)
// app.listen(4000, () => {
//     console.log('Server is running on port 4000');
// });