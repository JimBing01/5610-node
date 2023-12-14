import model from "./model.js";


export const findBySandwichId = (sandwichId) => model.findOne({sandwichId:sandwichId});
export const updateSandwich = (sandwichId, sandwich) =>
    model.updateMany({ sandwichId: sandwichId }, sandwich);








export const findByUsername = (username) =>
    model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });

export const deleteUser = (userId) => model.deleteOne({ _id: userId });