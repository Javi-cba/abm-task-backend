const express = require("express");
const userService = require("./user.service");

const router = express.Router();

// GET /api/user
router.get("/api/user", async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const params = req.query;

    // const page = parseInt(params.page, 10) || 0;
    // const perPage = parseInt(params.perPage, 10) || 10;
    // const filter = params.filter ? JSON.parse(params.filter) : {};
    // const sort = params.sort ? JSON.parse(params.sort) : {};

    const paginated = await userService.paginated({ params });
    return res.status(200).send(paginated);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// GET /api/user/:id
router.get("/api/user/:id", async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const userId = req.params.id;
    const user = await userService.findOneById(userId);
    if (!user) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error interno del servidor" });
  }
});

// POST /api/user
router.post("/api/user", async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const newUser = req.body;

    // Validar que todos los campos requeridos están presentes
    const requiredFields = ["firstname", "lastname", "email", "domicilio", "celular", "documento", "rol", "area"];
    for (const field of requiredFields) {
      if (!newUser[field]) {
        return res.status(400).send({ error: `El campo ${field} es requerido` });
      }
    }

    // Guardar el nuevo usuario
    const user = await userService.save(newUser);

    return res.status(201).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error interno del servidor" });
  }
});

// PUT /api/user/:id
router.put("/api/user/:id", async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const userId = req.params.id;
    // const updatedUser = req.body;
    const { firstname, lastname, email, domicilio, celular, documento, rol, area } = req.body

    const updatedUser = {
      firstname,
      lastname,
      email,
      domicilio,
      celular,
      documento,
      rol,
      area,
    }
    
    // Actualizar usuario por ID
    const user = await userService.update(userId, updatedUser);

    if (!user) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }

    return res.status(200).send(user);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return res.status(500).send({ error: "Error interno del servidor" });
  }
});

// DELETE /api/user/:id
router.delete("/api/user/:id", async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const userId = req.params.id;

    // Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ error: "ID de usuario inválido" });
    }

    // Eliminar usuario por ID
    await userService.remove(userId);

    return res.status(200).send("Usuario eliminado correctamente.");
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res.status(500).send({ error: "Error interno del servidor" });
  }
});

module.exports = router;
