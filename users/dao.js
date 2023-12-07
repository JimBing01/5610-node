// dao.js
import UserModel from "./model.js";

export const createUser = (user) => UserModel.create(user);
export const findAllUsers = () => UserModel.find();
export const findUserById = (userId) => UserModel.findById(userId);
export const findUserByEmail = (email) => UserModel.findOne({ email: email });
export const updateUser = (userId, user) => UserModel.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => UserModel.deleteOne({ _id: userId });
