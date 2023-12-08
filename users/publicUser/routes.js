import Database from "../../Database/index.js";

function PublicUserRoutes(app) {
    app.get('/api/users/public/:userId', (req, res) => {
        const userId = req.params.userId;
        // Fetch public user data based on userId
        // For example:
        // const userData = fetchPublicUserData(userId);
        // res.json(userData);
    });

    app.get('/api/users/public/:userId/reviews', (req, res) => {
        const userId = req.params.userId;

        // Assuming your Database has a 'reviews' array or similar structure
        const userReviews = Database.reviews.filter(review => review.userId === userId);

        if (userReviews.length > 0) {
            res.json(userReviews);
        } else {
            // If no reviews found for the user, send an appropriate response
            res.status(404).send('No reviews found for this user');
        }
    });
}

export default PublicUserRoutes;