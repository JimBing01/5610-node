// // users/schema.js
// import mongoose from "mongoose";
//
// const userSchema = new mongoose.Schema({
//                                            _id: mongoose.Schema.Types.ObjectId,
//                                            username: { type: String, required: true, unique: true },
//                                            password: { type: String, required: true },
//                                            firstName: String,
//                                            lastName: String,
//                                            email: String,
//                                            dob: Date,
//                                            role: String,
//                                            phone: String,
//                                        }, { collection: "users" });
//
// export default userSchema;

// User.js (Place this in your models folder)
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
                                           username: String,
                                           password: String,
                                           firstName: String,
                                           lastName: String,
                                           email: String,
                                           dob: Date,
                                           role: String,
                                           phone: String
                                       });

const User = mongoose.model('User', userSchema);

export default User;
