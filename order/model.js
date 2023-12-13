import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("customerOrder", schema);
export default model;