import mongoose from "mongoose";
const reviewsSchema = new mongoose.Schema({
        _id:String,
        sandwichId:String,
        name:String,
        reviews:[],
    },
    { collection: "Reviews" });
export default reviewsSchema;