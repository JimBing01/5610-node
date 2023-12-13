import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("PopularItems", schema);
export default model;