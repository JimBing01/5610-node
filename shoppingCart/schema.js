import mongoose from "mongoose";
const shoppingCartSchema = new mongoose.Schema({
        userId: String,
        name:String,
        description:String,
        price:Number,
        image:String,
        quantity:Number
    },
    { collection: "shoppingCart" });
export default shoppingCartSchema;