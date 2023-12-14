import model from "./model.js";

export const findShoppingCart = (userId) => model.find({userId:userId});
export const excludeShoppingCart = (userId) => model.deleteMany({userId: userId});
export const deleteShoppingCart = (orderId) => model.deleteOne({ _id: orderId });
export const updateShoppingCart = (orderId, body) =>
    model.updateOne({ _id: orderId }, { $set: body });
export const addShoppingCart = (item) => model.create(item);
export const findById = (userId) => model.findById(userId);


export const findAll = () => model.find();






export const findByUsername = (username) =>
    model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });
export const updateUser = (userId, user) =>
    model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });