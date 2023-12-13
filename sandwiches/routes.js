import * as breakfastDao from "./BreakfastSandwiches/dao.js";
import * as popularDao from "./PopularItems/dao.js";
import * as subsDao from "./SandwichesAndSubs/dao.js";

function SandwichRoutes(app) {
	const fetchBreakfastSandwiches = async (req, res) => {
		try {
			const breakfastSandwiches = await breakfastDao.fetchBreakfastSandwiches();
			res.send(breakfastSandwiches);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const fetchPopularItems = async (req, res) => {
		try {
			const popularItems = await popularDao.fetchPopularItems();
			res.send(popularItems);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	const fetchSandwichesAndSubs = async (req, res) => {
		try {
			const sandwichesAndSubs = await subsDao.fetchSandwichesAndSubs();
			res.send(sandwichesAndSubs);
		} catch (error) {
			res.status(500).send(error);
		}
	};

	app.get("/api/sandwiches/breakfast", fetchBreakfastSandwiches);
	app.get("/api/sandwiches/popular", fetchPopularItems);
	app.get("/api/sandwiches/subs", fetchSandwichesAndSubs);
}

export default SandwichRoutes;
