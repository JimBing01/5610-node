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