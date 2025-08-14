const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const URL = "/api/arbitros";
const { Op } = require("sequelize");

// Este endpoint devuelve todos los árbitros
router.get(URL, async (req, res) => {
  try {
    let arbitrosRes = await db.Arbitros.findAll({
      attributes: ["id_arbitro", "nombre_arbitro", "fecha_nacimiento"],
    });
    res.json(arbitrosRes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los árbitros");
  }
});

// Este endpoint es para obtener un árbitro a partir de su nombre
router.get(URL + "/nombreArbitro/:nombre", async (req, res) => {
  try {
    let item = await db.Arbitros.findAll({
      attributes: ["id_arbitro", "nombre_arbitro", "fecha_nacimiento"],
      where: { nombre_arbitro: {[Op.like] : `%${req.params.nombre}%`}},
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Árbitro no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el árbitro");
  }
});


// Este endpoint es para obtener un árbitro a partir de su id
router.get(URL + "/:id", async (req, res) => {
  try {
    let item = await db.Arbitros.findOne({
      attributes: ["id_arbitro", "nombre_arbitro", "fecha_nacimiento"],
      where: { id_arbitro: req.params.id },
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Árbitro no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el árbitro");
  }
});

// Este endpoint es para crear un árbitro nuevo
router.post(URL, async (req, res) => {
  try {
    const nuevoArbitro = await db.Arbitros.create({
      id_arbitro: req.body.id_arbitro,
      nombre_arbitro: req.body.nombre_arbitro,
      fecha_nacimiento: req.body.fecha_nacimiento,
    });
    res.status(200).json(nuevoArbitro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Este endpoint es para actualizar un árbitro a partir de su id
router.put(URL + "/:id", async (req, res) => {
  try {
    let arbitro = await db.Arbitros.findByPk(req.params.id);
    if (arbitro) {
      await arbitro.update(req.body);
      res.json(arbitro);
    } else {
      res.status(404).send("Árbitro no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Este endpoint es para eliminar un árbitro a partir de su id
router.delete(URL + "/:id", async (req, res) => {
  try {
    let arbitro = await db.Arbitros.findByPk(req.params.id);
    if (arbitro) {
      await arbitro.destroy();
      res.json(arbitro);
    } else {
      res.status(404).send("Árbitro no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;