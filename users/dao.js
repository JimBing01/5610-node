// users/dao.js
import userModel from "./model.js";

export const createUser = (user) => userModel.create(user);
export const findAllUsers = () => userModel.find();
export const findUserById = (userId) => userModel.findById(userId);
export const findUserByUsername = (username) => userModel.findOne({ username });
export const findUserByCredentials = (username, password) => userModel.findOne({ username, password });
export const updateUser = (userId, user) => userModel.findByIdAndUpdate(userId, user, { new: true });
export const deleteUser = (userId) => userModel.findByIdAndDelete(userId);
