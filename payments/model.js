import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("payments", schema);
export default model;