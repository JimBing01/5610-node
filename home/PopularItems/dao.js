import model from "./model.js";


export const fetchPopularItems = () => {
    return model.find();
};

// Function to add a new sandwich
export const addNewSandwich = async (sandwichData) => {
    try {
        // Create a new sandwich document using the Mongoose model
        const sandwich = new model(sandwichData);

        // Save the new sandwich document to the database
        await sandwich.save();

        // Return the saved sandwich
        return sandwich;
    } catch (error) {
        // Handle any errors that occur during the database operation
        throw error;
    }
};

// In popularDao, breakfastDao, and subsDao
export const updateSandwich = async (id, sandwichData) => {
    try {
        // Assuming you're using a MongoDB-like database and Mongoose
        const updatedSandwich = await model.findByIdAndUpdate(
            id,
            { $set: sandwichData },
            { new: true } // Return the updated document
        );

        return updatedSandwich;
    } catch (error) {
        throw error;
    }
};

export const deleteSandwich = async (sandwichId) => {
    try {
        // Delete the sandwich from the database
        await model.findByIdAndDelete(sandwichId);
    } catch (error) {
        throw error;
    }
};