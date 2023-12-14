import db from "../Database/index.js";
import multer from 'multer';
import path from 'path';
import * as breakfastDao from "./BreakfastSandwiches/dao.js";
import * as popularDao from "./PopularItems/dao.js";
import * as subsDao from "./SandwichesAndSubs/dao.js";
import * as shoppingDao from "../shoppingCart/dao.js"
import mongoose from "mongoose";

function HomeRoutes(app) {
    //console.log("HomeRoutes is being set up");

    app.get("/api/test-home", (req, res) => {
        res.send("HomeRoutes test route is working");
    });

    // 第一个你写的addShoppingCart function我没动，暂时comment掉了

    app.post("/home/:userId/sandwichModal", async (req, res) => {
        const {userId} = req.params;
        const newCart = {...req.body, quantity: 1, _id: new mongoose.Types.ObjectId()}

        await shoppingDao.addShoppingCart(newCart);
        const temp = await shoppingDao.findShoppingCart(userId)
        res.send(temp);
    });

    const fetchSandwiches = async (req, res) => {
        try {
            const {sandwichKind} = req.query;
            let sandwiches;

            switch (sandwichKind) {
                case 'popular':
                    sandwiches = await popularDao.fetchPopularItems();
                    break;
                case 'breakfast':
                    sandwiches = await breakfastDao.fetchBreakfastSandwiches();
                    break;
                case 'subs':
                    sandwiches = await subsDao.fetchSandwichesAndSubs();
                    break;
                default:
                    throw new Error('Invalid sandwich kind');
            }

            res.send(sandwiches);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    // 从fetchSandwiches到此我测试过了没报错，从addSandwich这里开始报错，后面的function我先comment掉了，准备一个一个测试来着
    const addSandwich = async (req, res) => {
        try {

            const {sandwich, activeMenu} = req.body;
            const newSandwich = {...sandwich, _id: new mongoose.Types.ObjectId(), price: parseFloat(sandwich.price)};
            let sandwiches;

            switch (activeMenu) {
                case 'popular':
                    await popularDao.addNewSandwich(newSandwich);
                    sandwiches = await popularDao.fetchPopularItems();
                    break;
                case 'breakfast':
                    await breakfastDao.addNewSandwich(newSandwich);
                    sandwiches = await breakfastDao.fetchBreakfastSandwiches();
                    break;
                case 'subs':
                    await subsDao.addNewSandwich(newSandwich);
                    sandwiches = await subsDao.fetchSandwichesAndSubs();
                    break;
                default:
                    throw new Error('Invalid menu');
            }

            res.send(sandwiches);
        } catch (error) {
            console.error("Error in addSandwich:", error);
            res.status(500).send(error.message || 'Internal Server Error');
        }
    };

    const updateSandwich = async (req, res) => {
        try {
            const {sandwich, activeMenu} = req.body;
            let sandwiches;
            switch (activeMenu) {
                case 'popular':
                    await popularDao.updateSandwich(sandwich._id, sandwich);
                    sandwiches = await popularDao.fetchPopularItems();
                    break;
                case 'breakfast':
                    await breakfastDao.updateSandwich(sandwich._id, sandwich);
                    sandwiches = await breakfastDao.fetchBreakfastSandwiches();
                    break;
                case 'subs':
                    await subsDao.updateSandwich(sandwich._id, sandwich);
                    sandwiches = await subsDao.fetchSandwichesAndSubs()
                    break;
                default:
                    throw new Error('Invalid menu');
            }


            res.send(sandwiches);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    const deleteSandwich = async (req, res) => {
        try {
            const {sandwichId, activeMenu} = req.query;
            let sandwiches;

            switch (activeMenu) {
                case 'popular':
                    await popularDao.deleteSandwich(sandwichId);
                    sandwiches = await popularDao.fetchPopularItems();
                    break;
                case 'breakfast':
                    await breakfastDao.deleteSandwich(sandwichId);
                    sandwiches = await breakfastDao.fetchBreakfastSandwiches();
                    break;
                case 'subs':
                    await subsDao.deleteSandwich(sandwichId);
                    sandwiches = await subsDao.fetchSandwichesAndSubs();
                    break;
                default:
                    throw new Error('Invalid menu');
            }
            res.send(sandwiches);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }


        app.get("/api/home", fetchSandwiches);
        app.post("/api/home", addSandwich);
        app.put("/api/home", updateSandwich);
        app.delete("/api/home", deleteSandwich);
        // };
}
export default HomeRoutes;