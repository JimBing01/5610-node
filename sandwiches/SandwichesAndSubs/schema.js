import mongoose from "mongoose";

const sandwichSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
},
{ collection: "SandwichesAndSubs" });

export default sandwichSchema;