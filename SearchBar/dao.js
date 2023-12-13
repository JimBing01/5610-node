import model from "./model.js";


export const fetchAllSandwiches = () => {
    return model.find();
};
