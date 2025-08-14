const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const URL = "/api/torneos";
const { Op } = require("sequelize");

// Este endpoint devuelve todos los torneos
router.get(URL, async (req, res) => {
  try {
    let torneosRes = await db.Torneos.findAll({
      attributes: ["id_torneo", "nombre_torneo", "año"],
    });
    res.json(torneosRes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los torneos");
  }
});

// Este endpoint es para obtener un torneo a partir de su nombre
router.get(URL + "/nombreTorneo/:nombre", async (req, res) => {
  try {
    let item = await db.Torneos.findAll({
      attributes: ["id_torneo", "nombre_torneo", "año"],
      where: { nombre_torneo: {[Op.like] : `%${req.params.nombre}%`} },
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Torneo no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el torneo");
  }
});


// Este endpoint es para obtener un torneo a partir de su id
router.get(URL + "/:id", async (req, res) => {
  try {
    let item = await db.Torneos.findOne({
      attributes: ["id_torneo", "nombre_torneo", "año"],
      where: { id_torneo: req.params.id },
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Torneo no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el torneo");
  }
});

// Este endpoint es para crear un torneo nuevo
router.post(URL, async (req, res) => {
  try {
    const nuevoTorneo = await db.Torneos.create({
      id_torneo: req.body.id_torneo,
      nombre_torneo: req.body.nombre_torneo,
      año: req.body.año
    });
    res.status(200).json(nuevoTorneo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Este endpoint es para actualizar un torneo a partir de su id
router.put(URL + "/:id", async (req, res) => {
  try {
    let torneo = await db.Torneos.findByPk(req.params.id);
    if (torneo) {
      await torneo.update(req.body);
      res.json(torneo);
    } else {
      res.status(404).send("Torneo no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Este endpoint es para eliminar un torneo a partir de su id
router.delete(URL + "/:id", async (req, res) => {
  try {
    let torneo = await db.Torneos.findByPk(req.params.id);
    if (torneo) {
      await torneo.destroy();
      res.json(torneo);
    } else {
      res.status(404).send("Torneo no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;