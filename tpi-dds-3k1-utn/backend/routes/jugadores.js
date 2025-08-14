const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const URL = "/api/jugadores";
const { Op } = require("sequelize");

// Este endpoint devuelve todos los jugadores
router.get(URL, async (req, res) => {
    try {
      let jugadoresRes = await db.Jugadores.findAll({
        attributes: ["id_jugador", "nombre_jugador", "fecha_nacimiento", "posicion", "id_equipo"]
      });
      res.json(jugadoresRes);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener los jugadores");
    }
  });


// Este endpoint es para obtener un jugador a partir de su nombre
router.get(URL + "/nombreJugador/:nombre", async (req, res) => {
  try {
    let item = await db.Jugadores.findAll({
      attributes: ["id_jugador", "nombre_jugador", "fecha_nacimiento", "posicion", "id_equipo"],
      where: { nombre_jugador: {[Op.like] : `%${req.params.nombre}%`} },
    });
    if (item) {
      res.json(item);
    } else {
      res.status(404).send("Jugador no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el jugador");
  }
});

// Este endpoint es para obtener un jugador a partir de su id
router.get(URL + "/:id", async (req, res) => {
    try {
      let item = await db.Jugadores.findOne({
        attributes: ["id_jugador", "nombre_jugador", "fecha_nacimiento", "posicion", "id_equipo"],
        where: { id_jugador: req.params.id },
      });
      if (item) {
        res.json(item);
      } else {
        res.status(404).send("Jugador no encontrado");
      }
    } catch (error) {
      res.status(500).send("Error al obtener el jugador");
    }
  });
  

// Este endpoint es para crear un jugador
router.post(URL, async (req, res) => {
    try {
      const nuevoJugador = await db.Jugadores.create(
        {
            id_jugador: req.body.id_jugador,
            nombre_jugador: req.body.nombre_jugador,
            fecha_nacimiento: req.body.fecha_nacimiento,
            posicion: req.body.posicion,
            id_equipo: req.body.id_equipo
        });
      res.status(200).json(nuevoJugador);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  


  // Este endpoint es para actualizar un equipo a partir de su id
  router.put(URL + "/:id", async (req, res) => {
    try {
      let jugador = await db.Jugadores.findByPk(req.params.id);
      if (jugador) {
        await jugador.update(req.body);
        res.json(jugador);
      } else {
        res.status(404).send("Jugador no encontrado");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  
  // Este endpoint es para eliminar un equipo a partir de su id
  router.delete(URL + "/:id", async (req, res) => {
    try {
      let jugador = await db.Jugadores.findByPk(req.params.id);
      if (jugador) {
        await jugador.destroy();
        res.json(jugador);
      } else {
        res.status(404).send("Jugador no encontrado");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });



module.exports = router;
