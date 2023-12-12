import mongoose from 'mongoose';

const favoritesSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  favoriteId: String,
  userId: String,
  name: String,
  description: String,
  image: String
}, { collection: "favorites" });

export default favoritesSchema;
