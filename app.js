import express from 'express';
import UserRoutes from "./users/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import cors from "cors";
import "dotenv/config";


const app = express();
app.use(cors());
app.use(express.json());
UserRoutes(app);


app.listen(process.env.PORT || 4000)