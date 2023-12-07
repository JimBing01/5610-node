// schema.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
                                           email: { type: String, required: true, unique: true },
                                           password: { type: String, required: true },
                                           role: {
                                               type: String,
                                               enum: ["merchant", "customer", "delivery"],
                                               required: true
                                           },
                                           // Add other fields as needed
                                       }, { collection: "users" });

export default userSchema;
