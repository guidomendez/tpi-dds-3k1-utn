const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const URL = "/api/partidos";

// Este endpoint devuelve todos los partidos
router.get(URL, async (req, res) => {
  try {
    let partidosRes = await db.Partidos.findAll({
      attributes: ["id_partido", "fecha", "id_estadio", "id_torneo", "id_equipo_local", "id_equipo_visitante", "id_arbitro", "resultado"],
    });
    res.json(partidosRes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los partidos");
  }
});

// Este endpoint es para obtener un partido a partir de su id
router.get(URL + "/:id", async (req, res) => {
  try {
    let item = await db.Partidos.findOne({
        attributes: ["id_partido", "fecha", "id_estadio", "id_torneo", "id_equipo_local", "id_equipo_visitante", "id_arbitro", "resultado"],
      where: { id_partido: req.params.id },
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Partido no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el partido");
  }
});

// Este endpoint es para crear un partido nuevo
router.post(URL, async (req, res) => {
  try {
    const nuevoPartido = await db.Partidos.create({
      id_partido: req.body.id_partido,
      fecha: req.body.fecha,
      id_estadio: req.body.id_estadio,
      id_torneo: req.body.id_torneo,
      id_equipo_local: req.body.id_equipo_local,
      id_equipo_visitante: req.body.id_equipo_visitante,
      id_arbitro: req.body.id_arbitro,
      resultado: req.body.resultado,
    });
    res.status(200).json(nuevoPartido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Este endpoint es para actualizar un partido a partir de su id
router.put(URL + "/:id", async (req, res) => {
  try {
    let partido = await db.Partidos.findByPk(req.params.id);
    if (partido) {
      await partido.update(req.body);
      res.json(partido);
    } else {
      res.status(404).send("Partido no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Este endpoint es para eliminar un partido a partir de su id
router.delete(URL + "/:id", async (req, res) => {
  try {
    let partido = await db.Partidos.findByPk(req.params.id);
    if (partido) {
      await partido.destroy();
      res.json(partido);
    } else {
      res.status(404).send("Partido no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;