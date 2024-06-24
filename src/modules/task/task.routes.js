const express = require("express");
const router = express.Router();
const taskService = require("./task.service");

// GET /api/task/:id
router.get("/api/task/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const utaskId = req.params.id;
    const task = await taskService.findOneById(utaskId); //Una sola Tarea

    return res.status(200).send(task);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// GET /api/task/user/:id
router.get("/api/task/user/:idUser", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const UserId = req.params.idUser;
    const tasks = await taskService.findTasksByUser(UserId); //Las tareas de un usuario

    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// GET /api/task
router.get("/api/task", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    params = req.query;
    let paginated = await taskService.paginated(params); //Todas las Tareas

    return res.status(200).send(paginated);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// POST /api/task
router.post("/api/task", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const { name, description, user, resume } = req.body;

    const TaskNw = {
      name,
      description,
      user,
      resume,
    };

    const taskResp = await taskService.save(TaskNw);

    return res.status(201).send(taskResp);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// PUT /api/task/:id
router.put("/api/task/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const IdTsk = req.params.id;

    const updatedTsk = req.body;
    const task = await taskService.update(IdTsk, updatedTsk);

    return res.status(200).send("Task updated successfully.");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// DELETE /api/task/:id
router.delete("/api/task/:id", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const IdTsk = req.params.id;

    await taskService.remove(IdTsk);

    return res.status(200).send("Task deleted successfully.");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
