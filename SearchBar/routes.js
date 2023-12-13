// import db from "../Database/index.js";
import * as AllSandwichesDao from "./dao.js";

function SearchBarRoutes(app) {


    // app.get("/api/sandwiches/search", (req, res) => {
    //     const query = req.query.name;
    //     const matchingSandwiches = db.AllSandwiches.filter((s) =>
    //         s.name.toLowerCase().includes(query.toLowerCase())
    //     );
    //     res.send(matchingSandwiches);
    // });

    // app.get("/api/sandwiches", (req, res) => {
    //     res.send(db.AllSandwiches);
    // });
    const fetchAllSandwichesHandler = async (req, res) => {
        try {
            const sandwiches = await AllSandwichesDao.fetchAllSandwiches();
            res.send(sandwiches);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
    
    // Function to handle searching sandwiches
    const searchSandwichesHandler = async (req, res) => {
        try {
            const query = req.query.name;
            const allSandwiches = await AllSandwichesDao.fetchAllSandwiches();
            const matchingSandwiches = allSandwiches.filter((s) =>
                s.name.toLowerCase().includes(query.toLowerCase())
            );
            res.send(matchingSandwiches);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    app.get("/api/sandwiches/search", searchSandwichesHandler);
    app.get("/api/sandwiches", fetchAllSandwichesHandler);
}


export default SearchBarRoutes;
