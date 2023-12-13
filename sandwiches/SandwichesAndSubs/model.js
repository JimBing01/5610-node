import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("SandwichesAndSubs", schema);
export default model;