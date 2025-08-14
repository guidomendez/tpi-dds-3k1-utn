const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const URL = "/api/estadios"; // Cambio de URL base a '/api/estadios'
const { Op } = require("sequelize");

// Este endpoint devuelve todos los estadios
router.get(URL, async (req, res) => {
  try {
    let estadiosRes = await db.Estadios.findAll({
      attributes: ["id_estadio", "nombre_estadio", "id_ciudad", "fecha_inauguracion", "capacidad"],
    });
    res.json(estadiosRes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los estadios");
  }
});


// Este endpoint es para obtener un estadio a partir de su nombre
router.get(URL + "/nombreEstadio/:nombre", async (req, res) => {
  try {
    let estadio = await db.Estadios.findAll({
      attributes: ["id_estadio", "nombre_estadio", "id_ciudad", "fecha_inauguracion", "capacidad"],
      where: { nombre_estadio: {[Op.like] : `%${req.params.nombre}%`} },
    });
    if (estadio) {
      res.json(estadio);
    } else {
      res.status(404).send("Estadio no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el estadio");
  }
});

// Este endpoint es para obtener un estadio a partir de su id
router.get(URL + "/:id", async (req, res) => {
  try {
    let estadio = await db.Estadios.findOne({
      attributes: ["id_estadio", "nombre_estadio", "id_ciudad", "fecha_inauguracion", "capacidad"],
      where: { id_estadio: req.params.id },
    });
    if (estadio) {
      res.json(estadio);
    } else {
      res.status(404).send("Estadio no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el estadio");
  }
});

// Este endpoint es para crear un nuevo estadio
router.post(URL, async (req, res) => {
  try {
    const nuevoEstadio = await db.Estadios.create({
      nombre_estadio: req.body.nombre_estadio,
      id_ciudad: req.body.id_ciudad,
      fecha_inauguracion: req.body.fecha_inauguracion,
      capacidad: req.body.capacidad,
    });
    res.status(200).json(nuevoEstadio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Este endpoint es para actualizar un estadio a partir de su id
router.put(URL + "/:id", async (req, res) => {
  try {
    let estadio = await db.Estadios.findByPk(req.params.id);
    if (estadio) {
      await estadio.update(req.body);
      res.json(estadio);
    } else {
      res.status(404).send("Estadio no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Este endpoint es para eliminar un estadio a partir de su id
router.delete(URL + "/:id", async (req, res) => {
  try {
    let estadio = await db.Estadios.findByPk(req.params.id);
    if (estadio) {
      await estadio.destroy();
      res.json(estadio);
    } else {
      res.status(404).send("Estadio no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

