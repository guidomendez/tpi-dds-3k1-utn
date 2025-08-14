const express = require("express");
const cors = require("cors");

// crear servidor
const app = express();
app.use(express.json());
app.use(cors());

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

// Controlamos para ver si se cargan los equipos
const equiposRouter = require("./routes/equipos");
app.use(equiposRouter);

// Controlamos para ver si se cargan los jugadores
const jugadoresRouter = require("./routes/jugadores");
app.use(jugadoresRouter);

// Controlamos para ver si se cargan los partidos
const partidosRouter = require("./routes/partidos");
app.use(partidosRouter);

// Controlamos para ver si se cargan los torneos
const torneosRouter = require("./routes/torneos");
app.use(torneosRouter);


// Controlamos para ver si se cargan las ciudades
const ciudadesRouter = require("./routes/ciudades");
app.use(ciudadesRouter);

// Controlamos para ver si se cargan los estadios
const estadiosRouter = require("./routes/estadios");
app.use(estadiosRouter);


// Controlamos para ver si se cargan las estadisticas
const arbitrosRouter = require("./routes/arbitros");
app.use(arbitrosRouter);


// Controlamos para ver si se cargan las entrenadores
const entrenadoresRouter = require("./routes/entrenadores");
app.use(entrenadoresRouter);


// levantar servidor
if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
  const port = process.env.PORT || 4000;   // en producción se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}
module.exports = app; // para testing
