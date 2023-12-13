import model from "./model.js";

export const findPastOrders = (userId) => model.find({userId:userId});
export const updatePastOrder = (orderId, pastOrder) =>
    model.updateOne({ _id: orderId }, { $set: pastOrder });
export const findAll = () => model.find();
export const createPastOrder = (pastOrder) => model.create(pastOrder);


export const findById = (userId) => model.findById(userId);
export const findByUsername = (username) =>
    model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });
export const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });