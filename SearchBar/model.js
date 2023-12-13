import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("AllSandwiches", schema);
export default model;