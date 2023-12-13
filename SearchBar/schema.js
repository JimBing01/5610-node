import mongoose from "mongoose";

const AllSandwichesSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
},
{ collection: "AllSandwiches" });

export default AllSandwichesSchema;