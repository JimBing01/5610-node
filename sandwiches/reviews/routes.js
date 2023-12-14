import db from "../../Database/index.js";
import * as daoCustomer from "../../order/dao.js";
import * as dao from "./dao.js";
import mongoose from "mongoose";

function SandwichReviews(app) {
    app.get("/api/sandwiches/:sId/reviews", async (req, res) => {
        const sandwichId = req.params.sId;
        const {frontSandwich} = req.query
        if(await dao.findBySandwichId(sandwichId) == null){
            let newSandwich = {name:frontSandwich.name,sandwichId:sandwichId,reviews:[],
                _id:new mongoose.Types.ObjectId()}
            await dao.createSandwichReview(newSandwich)
        }
        console.log(frontSandwich)
        let customerOrder;
        await daoCustomer.findAll().then(docs => {
            customerOrder = docs; // docs is an array of documents
            dao.findBySandwichId(sandwichId).then(sandwich =>{
                sandwich.reviews = [];
                for(let i = 0; i < customerOrder.length; i++) {
                    let food = customerOrder[i].food;
                    for(let j = 0; j < food.length; j++) {
                        if(food[j][1].name == frontSandwich.name) {
                            let review = {"body":food[j][1].comment,"username":customerOrder[i].userName,
                                "userId":customerOrder[i].userId,"date":customerOrder[i].date}
                            if(food[j][1].star1 == true) {
                                review = {...review,"rating":1}
                            } else if(food[j][1].star2 == true) {
                                review = {...review,"rating":2}
                            }else if(food[j][1].star3 == true) {
                                review = {...review,"rating":3}
                            }else if(food[j][1].star4 == true) {
                                review = {...review,"rating":4}
                            }else if(food[j][1].star5 == true){
                                review = {...review,"rating":5}
                            }else{
                                break;
                            }
                            sandwich.reviews.push(review)
                        }
                    }
                }

                if (!sandwich) {
                    res.status(404).json({ error: "Sandwich not found" });
                    return;
                }

                res.json(sandwich.reviews || []);
            }).catch(err => {
                console.error(err); // Error handling
            })
            });
    });


    /*app.put("/api/sandwiches/:sId/reviews", async (req, res) => {
        const sandwichId = req.params.sId;
        const sandwich = req.body;
        await dao.updateSandwich(sandwichId,sandwich);

    });*/
}

export default SandwichReviews;