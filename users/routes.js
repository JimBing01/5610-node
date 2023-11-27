import Database from "../Database/index.js";
function UserRoutes(app) {
  app.get("/users", async (req, res) => {
    const users = await Database.Users.findAll();
    res.json(users);
  });

  app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await Database.Users.findOne(id);
    res.json(user);
  });

    app.post("/users", async (req, res) => {
        const user = await Database.Users.create(req.body);
        res.json(user);
    });

    app.put("/users/:id", async (req, res) => {
        const { id } = req.params;
        const user = await Database.Users.update(id, req.body);
        res.json(user);
    });
}



export default UserRoutes;
