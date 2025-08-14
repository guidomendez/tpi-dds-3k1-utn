const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const URL = "/api/equipos";
const { Op } = require("sequelize");

// Este endpoint devuelve todos los equipos
router.get(URL, async (req, res) => {
  try {
    let equiposRes = await db.Equipos.findAll({
      attributes: ["id_equipo", "nombre_equipo", "abreviatura"],
    });
    res.json(equiposRes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los equipos");
  }
});


// Este endpoint es para obtener un equipo a partir de su nombre de equipo
router.get(URL + "/nombreEquipo/:nombre", async (req, res) => {
  try {
    let item = await db.Equipos.findAll({
      attributes: ["id_equipo", "nombre_equipo", "abreviatura"],
      where: { nombre_equipo: {[Op.like] : `%${req.params.nombre}%`} },
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Equipo no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el equipo");
  }
});


// Este endpoint es para obtener un equipo a partir de su id
router.get(URL + "/:id", async (req, res) => {
  try {
    let item = await db.Equipos.findOne({
      attributes: ["id_equipo", "nombre_equipo", "abreviatura"],
      where: { id_equipo: req.params.id },
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Equipo no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el equipo");
  }
});

// Este endpoint es para crear un equipo nuevo
router.post(URL, async (req, res) => {
  try {
    const nuevoEquipo = await db.Equipos.create(
      {
        id_equipo: req.body.id_equipo,
        nombre_equipo: req.body.nombre_equipo,
        abreviatura: req.body.abreviatura
      });
    res.status(200).json(nuevoEquipo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Este endpoint es para actualizar un equipo a partir de su id
router.put(URL + "/:id", async (req, res) => {
  try {
    let equipo = await db.Equipos.findByPk(req.params.id);
    if (equipo) {
      await equipo.update(req.body);
      res.json(equipo);
    } else {
      res.status(404).send("Equipo no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Este endpoint es para eliminar un equipo a partir de su id
router.delete(URL + "/:id", async (req, res) => {
  try {
    let equipo = await db.Equipos.findByPk(req.params.id);
    if (equipo) {
      await equipo.destroy();
      res.json(equipo);
    } else {
      res.status(404).send("Equipo no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
