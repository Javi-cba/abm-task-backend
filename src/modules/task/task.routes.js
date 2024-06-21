const express = require("express");
const taskService = require("./task.service");

const router = express.Router();

// GET /api/task
// metodo query - revisar page
router.get("/api/task", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    params = req.query
    // params = req.params.page //revisar

    let paginated = await taskService.paginated(params)
    return res.status(200).send(paginated);

  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
});

// GET /api/task/:id
router.get("/api/task/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const userId = req.params.id;
    const user = await taskService.findOneById(userId);
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// POST /api/task
//metodo body 
router.post("/api/task", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    // const newUser = req.body;

    const { name, description, resume, user } = req.body

    const newUser = {
      name,
      description,
      resume,
      user
    }
    console.log(newUser);

    const users = await taskService.save(newUser);
    return res.status(201).send(users);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// PUT /api/task/:id
// metodo params
router.put("/api/task/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const userId = req.params.id;
    // const description = req.params.description;
    // const resume = req.params.resume;

    const updatedUser = req.body;

    // const { name, description, resume } = req.body

    // const updatedUser = {
    //   name,
    //   description,
    //   resume
    // }

    const user = await taskService.update(userId, updatedUser);
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// DELETE /api/task/:id
router.delete("/api/task/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const userId = req.params.id;
    await taskService.remove(userId);
    return res.status(200).send("Tarea eliminada correctamente.");

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;

// description,resume,