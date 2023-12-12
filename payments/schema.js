import mongoose from 'mongoose';


const paymentsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: String,
  pid: String,
  type: String,
  cardNumber: String,
  expirationDate: String,
  securityCode: String,
  isDefault: Boolean
}, { collection: "payments" });
export default paymentsSchema;