import model from "./model.js";


export const fetchSandwichesAndSubs = () => {
    return model.find();
};

// Function to add a new sandwich
export const addNewSandwich = (sandwich) => model.create(sandwich)

// In popularDao, breakfastDao, and subsDao
export const updateSandwich = (id, sandwich) =>
    model.updateOne({ _id: id }, { $set: sandwich });

export const deleteSandwich = (sandwichId) => model.deleteOne({ _id: sandwichId });