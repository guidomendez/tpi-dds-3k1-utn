const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const URL = "/api/entrenadores";
const { Op } = require("sequelize");

// Este endpoint devuelve todos los entrenadores
router.get(URL, async (req, res) => {
  try {
    let entrenadoresRes = await db.Entrenadores.findAll({
      attributes: ["id_entrenador", "nombre_entrenador", "fecha_nacimiento", "id_equipo"],
    });
    res.json(entrenadoresRes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los entrenadores");
  }
});



// Este endpoint es para obtener un entrenador a partir de su nombre
router.get(URL + "/nombreEntrenador/:nombre", async (req, res) => {
  try {
    let item = await db.Entrenadores.findAll({
      attributes: ["id_entrenador", "nombre_entrenador", "fecha_nacimiento", "id_equipo"],
      where: { nombre_entrenador: {[Op.like] : `%${req.params.nombre}%`} },
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Entrenador no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el entrenador");
  }
});


// Este endpoint es para obtener un entrenador a partir de su id
router.get(URL + "/:id", async (req, res) => {
  try {
    let item = await db.Entrenadores.findOne({
      attributes: ["id_entrenador", "nombre_entrenador", "fecha_nacimiento", "id_equipo"],
      where: { id_entrenador: req.params.id },
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Entrenador no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el entrenador");
  }
});

// Este endpoint es para crear un entrenador nuevo
router.post(URL, async (req, res) => {
  try {
    const nuevoEntrenador = await db.Entrenadores.create({
      id_entrenador: req.body.id_entrenador,
      nombre_entrenador: req.body.nombre_entrenador,
      fecha_nacimiento: req.body.fecha_nacimiento,
      id_equipo: req.body.id_equipo,
    });
    res.status(200).json(nuevoEntrenador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Este endpoint es para actualizar un entrenador a partir de su id
router.put(URL + "/:id", async (req, res) => {
  try {
    let entrenador = await db.Entrenadores.findByPk(req.params.id);
    if (entrenador) {
      await entrenador.update(req.body);
      res.json(entrenador);
    } else {
      res.status(404).send("Entrenador no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Este endpoint es para eliminar un entrenador a partir de su id
router.delete(URL + "/:id", async (req, res) => {
  try {
    let entrenador = await db.Entrenadores.findByPk(req.params.id);
    if (entrenador) {
      await entrenador.destroy();
      res.json(entrenador);
    } else {
      res.status(404).send("Entrenador no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;