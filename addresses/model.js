import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("adresses", schema);
export default model;