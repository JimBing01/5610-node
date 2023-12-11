import db from "../Database/index.js";
import multer from 'multer';
import path from 'path';

function HomeRoutes(app) {

    app.post("/home/:userId/sandwichModal", (req, res) => {
        const { userId } = req.params;
        const newCart = {...req.body,quantity:1}
        db.shoppingCart.push(newCart);
        res.send(db.shoppingCart.filter((m) => m.userId === userId));
    });

    app.get("/home", (req, res) => {

        const {sandwichKind} = req.query;

        let sandwiches = 'error find';
        if(sandwichKind == 'popular'){
            sandwiches = db.PopularItems;
        } else if(sandwichKind == 'breakfast') {
            sandwiches = db.BreakfastSandwiches;
        } else if(sandwichKind == 'subs') {
            sandwiches = db.SandwichesAndSubs;
        }
        res.send(sandwiches);

    });

    app.post("/home",(req, res) => {
        const { sandwich } = req.body;
        const { activeMenu } = req.body;
        const newSandwich = {...sandwich,_id:new Date().getTime().toString(),price:parseFloat(sandwich.price)}
        let sandwiches = null

        if(activeMenu == 'popular'){
            db.PopularItems.push(newSandwich)
            sandwiches = db.PopularItems;
        } else if(activeMenu == 'breakfast') {
            db.BreakfastSandwiches.push(newSandwich);
            sandwiches = db.BreakfastSandwiches;
        } else if(activeMenu == 'subs') {
            sandwiches = db.SandwichesAndSubs.push(newSandwich);
            sandwiches = db.SandwichesAndSubs;
        }

        res.send(sandwiches);
    });

    app.put("/home", (req, res) => {
        const { sandwich } = req.body;
        const { activeMenu } = req.body;
        console.log(sandwich)

        let sandwiches = null
        if(activeMenu == 'popular'){
            const orderIndex = db.PopularItems.findIndex(
                (m) => m._id === sandwich._id);

            db.PopularItems[orderIndex] = {
                ...db.PopularItems[orderIndex],
                ...sandwich,
                price:parseFloat(sandwich.price)
            };
            sandwiches = db.PopularItems;
        } else if(activeMenu == 'breakfast') {
            const orderIndex = db.BreakfastSandwiches.findIndex(
                (m) => m._id === sandwich._id);

            db.BreakfastSandwiches[orderIndex] = {
                ...db.BreakfastSandwiches[orderIndex],
                ...sandwich,
                price:parseFloat(sandwich.price)
            };

            sandwiches = db.BreakfastSandwiches;
        } else if(activeMenu == 'subs') {
            const orderIndex = db.SandwichesAndSubs.findIndex(
                (m) => m._id === sandwich._id);

            db.SandwichesAndSubs[orderIndex] = {
                ...db.SandwichesAndSubs[orderIndex],
                ...sandwich,
                price:parseFloat(sandwich.price)
            };
            sandwiches = db.SandwichesAndSubs;
        }

        res.send(sandwiches);
    });

    app.delete("/home", (req, res) => {

        const {sandwichId} = req.query;
        const {activeMenu} = req.query;

        console.log(sandwichId)
        let sandwiches = 'error find';
        if(activeMenu == 'popular'){
            db.PopularItems = db.PopularItems.filter((a) => a._id !== sandwichId);
            sandwiches = db.PopularItems;
        } else if(activeMenu == 'breakfast') {
            db.BreakfastSandwiches = db.BreakfastSandwiches.filter((a) => a._id !== sandwichId);
            sandwiches = db.BreakfastSandwiches;
        } else if(activeMenu == 'subs') {
            db.SandwichesAndSubs = db.SandwichesAndSubs.filter((a) => a._id !== sandwichId);
            sandwiches = db.SandwichesAndSubs;
        }

        res.send(sandwiches);

    });
}
export default HomeRoutes;