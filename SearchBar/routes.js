import db from "../Database/index.js";

function SearchBarRoutes(app) {
	app.get("/api/sandwiches/search", (req, res) => {
		const query = req.query.name;
		const matchingSandwiches = db.AllSandwiches.filter((s) =>
			s.name.toLowerCase().startsWith(query.toLowerCase())
		);
		res.send(matchingSandwiches);
	});

	app.get("/api/sandwiches", (req, res) => {
		res.send(db.AllSandwiches);
	});
}

export default SearchBarRoutes;
