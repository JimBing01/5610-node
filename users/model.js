// model.js
import mongoose from "mongoose";
import userSchema from "./schema.js";

const UserModel = mongoose.model("User", userSchema);
export default UserModel;

