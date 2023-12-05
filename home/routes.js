import db from "../Database/index.js";

function HomeRoutes(app) {

    app.post("/home/:userId/sandwichModal", (req, res) => {
        const { userId } = req.params;
        const newCart = {...req.body,quantity:1}
        db.shoppingCart.push(newCart);
        res.send(db.shoppingCart.filter((m) => m.userId === userId));
    });

}
export default HomeRoutes;