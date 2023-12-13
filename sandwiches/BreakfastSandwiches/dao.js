import model from "./model.js";

// export const fetchAllSandwiches = () => {
//     return AllSandwiches.findAll();
// };

export const fetchBreakfastSandwiches = () => {
	return model.find();
};

// export const fetchPopularItems = () => {
//     return PopularItems.find();
// };

// export const fetchSandwichesAndSubs = () => {
//     return SandwichesAndSubs.find();
// };

// export const fetchBreakfastSandwiches = () => model.find({ type: "breakfast" });

// export const fetchPopularItems = () => model.find({ type: "popular" });

// export const fetchSandwichesAndSubs = () => model.find({ type: "subs" });
