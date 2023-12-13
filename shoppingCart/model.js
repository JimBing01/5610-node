import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("shoppingCart", schema);
export default model;