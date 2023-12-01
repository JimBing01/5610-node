import db from "../Database/index.js";

function HomeRoutes(app) {

    app.post("/home/:userId/sandwichModal", (req, res) => {
        const { userId } = req.params;
        db.shoppingCart.push(req.body);
        res.send(db.shoppingCart.filter((m) => m.userId === userId));
    });


}
export default HomeRoutes;