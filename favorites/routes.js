import mongoose from "mongoose";
import Favorites from "./model.js"; 


function FavoritesRoutes(app) {
    // Get all favorites for a user
    app.get("/user/:userId/favorites", async (req, res) => {
        try {
            const { userId } = req.params;
            const favorites = await Favorites.find({ userId: userId });
            res.send(favorites);
        } catch (error) {
            res.status(500).send('Error fetching favorites');
        }
    });
    
    // Add a new favorite
    app.post("/user/:userId/favorites", async (req, res) => {
        const { userId } = req.params;
        try {
            // Generate a unique favoriteId using a MongoDB ObjectId
            const favoriteId = new mongoose.Types.ObjectId().toString();

            const newFavorite = new Favorites({
                ...req.body,
                userId,
                favoriteId, // Assign the generated favoriteId
                _id: new mongoose.Types.ObjectId() // MongoDB's ObjectId for the document's primary key (_id)
            });
            await newFavorite.save();
            res.status(201).send(newFavorite);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    
    // Delete a favorite
    app.delete("/user/:userId/favorites/:favoriteId", async (req, res) => {
        try {
            const { favoriteId } = req.params;
            await Favorites.deleteOne({ favoriteId: favoriteId });
            res.sendStatus(200);
        } catch (error) {
            res.status(500).send('Error deleting favorite');
        }
    });

    // Update a favorite
    app.put("/user/:userId/favorites/:favoriteId", async (req, res) => {
        try {
            const { favoriteId } = req.params;
            await Favorites.updateOne({ favoriteId: favoriteId }, { $set: req.body });
            res.sendStatus(204);
        } catch (error) {
            res.status(500).send('Error updating favorite');
        }
    });
}

export default FavoritesRoutes;
