import db from "../../Database/index.js";

function SandwichReviews(app) {
    app.get("/api/sandwiches/:sId/reviews", (req, res) => {
        const sandwichId = req.params.sId;
        const sandwich = db.reviews.find(s => s._id === sandwichId);
        if (!sandwich) {
            res.status(404).json({ error: "Sandwich not found" });
            return;
        }
        res.json(sandwich.reviews || []);
    });
}

export default SandwichReviews;