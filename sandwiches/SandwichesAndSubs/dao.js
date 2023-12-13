import model from "./model.js";


export const fetchSandwichesAndSubs = () => {
    return model.find();
};
