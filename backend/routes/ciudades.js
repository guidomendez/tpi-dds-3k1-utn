const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const URL = "/api/ciudades"; // Cambio de URL base a '/api/ciudades'
const { Op } = require("sequelize");

// Este endpoint devuelve todas las ciudades
router.get(URL, async (req, res) => {
  try {
    let ciudadesRes = await db.Ciudades.findAll({
      attributes: ["id_ciudad", "nombre"],
    });
    res.json(ciudadesRes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener las ciudades");
  }
});


// Este endpoint es para obtener un ciudad a partir de su nombre
router.get(URL + "/nombreCiudad/:nombre", async (req, res) => {
  try {
    let item = await db.Ciudades.findAll({
      attributes: ["id_ciudad", "nombre"],
      where: { nombre: {[Op.like] : `%${req.params.nombre}%`} },
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Ciudad no encontrada");
    }
  } catch (error) {
    res.status(500).send("Error al obtener la ciudad");
  }
});

// Este endpoint es para obtener una ciudad a partir de su id
router.get(URL + "/:id", async (req, res) => {
  try {
    let ciudad = await db.Ciudades.findOne({
      attributes: ["id_ciudad", "nombre"],
      where: { id_ciudad: req.params.id },
    });
    if (ciudad) {
      res.json(ciudad);
    } else {
      res.status(404).send("Ciudad no encontrada");
    }
  } catch (error) {
    res.status(500).send("Error al obtener la ciudad");
  }
});

// Este endpoint es para crear una nueva ciudad
router.post(URL, async (req, res) => {
  try {
    const nuevaCiudad = await db.Ciudades.create({
      nombre: req.body.nombre,
    });
    res.status(200).json(nuevaCiudad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Este endpoint es para actualizar una ciudad a partir de su id
router.put(URL + "/:id", async (req, res) => {
  try {
    let ciudad = await db.Ciudades.findByPk(req.params.id);
    if (ciudad) {
      await ciudad.update(req.body);
      res.json(ciudad);
    } else {
      res.status(404).send("Ciudad no encontrada");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Este endpoint es para eliminar una ciudad a partir de su id
router.delete(URL + "/:id", async (req, res) => {
  try {
    let ciudad = await db.Ciudades.findByPk(req.params.id);
    if (ciudad) {
      await ciudad.destroy();
      res.json(ciudad);
    } else {
      res.status(404).send("Ciudad no encontrada");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
