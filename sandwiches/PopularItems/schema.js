import mongoose from "mongoose";

const sandwichSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
},
{ collection: "PopularItems" });

export default sandwichSchema;