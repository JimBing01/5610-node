import model from "./model.js";


export const findBySandwichId = (sandwichId) => model.findOne({sandwichId:sandwichId});
export const updateSandwich = (sandwichId, sandwich) =>
    model.updateMany({ sandwichId: sandwichId }, sandwich);
export const deleteSandwichReview = (sandwichId) => model.deleteOne({ sandwichId: sandwichId });
export const createSandwichReview = (sandwich) => model.create(sandwich);



export const findByUsername = (username) =>
    model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });

