import express from 'express';
// const express = require('express')
// import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import cors from "cors";
import "dotenv/config";


const app = express();
app.use(cors());
app.use(express.json());
// nod
app.get('/hello', (req, res) => {res.send('Hello World!')})
// CourseRoutes(app);node


app.listen(process.env.PORT || 4000)

