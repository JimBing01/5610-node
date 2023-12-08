import db from "../Database/index.js";

function SandwichRoutes(app) {
	app.get("/api/sandwiches/breakfast", (req, res) => {
		res.json(db.BreakfastSandwiches);
	});

	app.get("/api/sandwiches/popular", (req, res) => {
		try {
            res.json(db.PopularItems);
        } catch (error) {
            console.error("Error on /api/sandwiches/popular endpoint:", error);
            res.status(500).json({ error: "Internal server error" });
        }
	});

	app.get("/api/sandwiches/subs", (req, res) => {
		res.json(db.SandwichesAndSubs);
	});

	app.get("/api/sandwich/:sId", (req, res) => {
		const { sId } = req.params;
		try {
			const sandwich = db.AllSandwiches.find((s) => s.id === sId);
			if (!sandwich) {
				res.status(404).json({ error: "Sandwich not found" });
				return;
			}
			res.json(sandwich);
		} catch (error) {
			console.error("Error fetching sandwich:", error);
			res.status(500).json({ error: "Internal server error" });
		}
	});
}

export default SandwichRoutes;
