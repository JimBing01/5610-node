import Database from "../Database/index.js";

function FavoritesRoutes(app) {
    app.get("/user/:userId/favorites", (req, res) => {
        console.log('Database:', Database);
        console.log('Favorites:', Database.favorites);
    
        // Check if Database.favorites is defined
        if (!Database.favorites) {
            return res.status(500).send('Database not initialized');
        }
    
        const { userId } = req.params;
        const favorites = Database.favorites.filter((m) => m.userId === userId);
        res.send(favorites);
    });
    
    app.post("/user/:userId/favorites", (req, res) => {
        const { userId } = req.params;
        const newFavorite = {
            ...req.body,
            userId,
        };
        Database.favorites.push(newFavorite);
        res.send(newFavorite);
    }
    );
    app.delete("/user/:userId/favorites/:favoriteId", (req, res) => {
        const { favoriteId } = req.params;
        Database.favorites = Database.favorites.filter((favorite) => favorite.favoriteId !== favoriteId);
        res.sendStatus(200);
    }
    );
    app.put("/user/:userId/favorites/:favoriteId", (req, res) => {
        const { favoriteId } = req.params;
        const favoriteIndex = Database.favorites.findIndex((m) => m.favoriteId === favoriteId);
        Database.favorites[favoriteIndex] = {
            ...Database.favorites[favoriteIndex],
            ...req.body
        };
        res.sendStatus(204);
    }
    );
}
export default FavoritesRoutes;