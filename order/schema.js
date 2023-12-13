import mongoose from "mongoose";
const customerOrderSchema = new mongoose.Schema({
        userId: String,
        userName:String,
        date: Date,
        price:String,
        food:[],
        status: String,
        address:String,
        image:String
    },
    { collection: "customerOrder" });
export default customerOrderSchema;