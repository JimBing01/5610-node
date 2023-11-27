import express from 'express';
import UserRoutes from "./users/routes.js";
import cors from "cors";
import "dotenv/config";


const app = express();
app.use(cors());
app.use(express.json());
UserRoutes(app);
// ModuleRoutes(app);
// AssignmentRoutes(app);
// CourseRoutes(app);
// Lab5(app);
// Hello(app)

app.listen(process.env.PORT || 4000)