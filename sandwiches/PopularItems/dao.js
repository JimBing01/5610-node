import model from "./model.js";


export const fetchPopularItems = () => {
    return model.find();
};
