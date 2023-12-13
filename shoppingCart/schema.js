import mongoose from "mongoose";
const shoppingCartSchema = new mongoose.Schema({
        _id:String,
        userId: String,
        name:String,
        description:String,
        price:Number,
        image:String,
        quantity:Number
    },
    { collection: "shoppingCart" });
export default shoppingCartSchema;