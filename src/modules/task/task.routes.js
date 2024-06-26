const express = require("express");
const router = express.Router();
const taskService = require("./task.service");

// GET /api/task
router.get("/api/task", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const { taskId } = req.query;
    const task = await taskService.findOneById(taskId); //Una sola Tarea

    return res.status(200).send(task);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// GET /api/task/user
router.get("/api/task/user", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const { idUser } = req.query;
    const tasks = await taskService.findTasksByUser(idUser); //Las tareas de un usuario

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

// PUT /api/task
router.put("/api/task", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const { taskId } = req.query;

    const updatedTsk = req.body;
    await taskService.update(taskId, updatedTsk);

    return res.status(200).send("Task updated successfully.");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// DELETE /api/task
router.delete("/api/task", async (req, res) => {
  // #swagger.tags = ['Task']
  try {
    const { taskId } = req.query;

    await taskService.remove(taskId);

    return res.status(200).send("Task deleted successfully.");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
