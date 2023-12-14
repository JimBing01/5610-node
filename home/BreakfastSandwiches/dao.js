import model from "./model.js";

// export const fetchAllSandwiches = () => {
//     return AllSandwiches.findAll();
// };

export const fetchBreakfastSandwiches = () => {
	return model.find();
};

// Function to add a new sandwich
export const addNewSandwich = (sandwich) => model.create(sandwich)

// In popularDao, breakfastDao, and subsDao
export const updateSandwich = (id, sandwich) =>
    model.updateOne({ _id: id }, { $set: sandwich });


export const deleteSandwich = (sandwichId) => model.deleteOne({ _id: sandwichId });


// export const fetchPopularItems = () => {
//     return PopularItems.find();
// };

// export const fetchSandwichesAndSubs = () => {
//     return SandwichesAndSubs.find();
// };

// export const fetchBreakfastSandwiches = () => model.find({ type: "breakfast" });

// export const fetchPopularItems = () => model.find({ type: "popular" });

// export const fetchSandwichesAndSubs = () => model.find({ type: "subs" });
