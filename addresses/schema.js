import mongoose from 'mongoose';

const addressesSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  addressId: String,
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String
}, { collection: "addresses" });

export default addressesSchema;
