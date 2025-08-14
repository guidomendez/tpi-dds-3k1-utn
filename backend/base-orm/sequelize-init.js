const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/tp-bd.db");


// Definición del modelo de datos de Ciudades
const Ciudades = sequelize.define("Ciudades", {
    id_ciudad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
});


// Definición del modelo de datos de Estadios
const Estadios = sequelize.define("Estadios", {
    id_estadio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_estadio: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    id_ciudad: {
        type: DataTypes.NUMBER(50),
        allowNull: true,
        references: { model: Ciudades, key: 'id_ciudad' }
    },
    fecha_inauguracion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    timestamps: false,
});

// Definición del modelo de datos de Árbitros
const Arbitros = sequelize.define("Arbitros", {
    id_arbitro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_arbitro: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
}, {
    timestamps: false,
});


// Definición del modelo de datos de Equipos
const Equipos = sequelize.define("Equipos", {
    id_equipo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_equipo: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    abreviatura: {
        type: DataTypes.STRING(20),
        allowNull: false,
    }
},
    {
        timestamps: false,
    });

// Definición del modelo de datos de Jugadores
const Jugadores = sequelize.define("Jugadores", {
    id_jugador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_jugador: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    posicion: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    id_equipo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: Equipos, key: 'id_equipo' }
    },
}, {
    timestamps: false,
});


// Definición del modelo de datos de Torneos
const Torneos = sequelize.define("Torneos", {
    id_torneo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_torneo: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    año: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

// Definición del modelo de datos de Partidos
const Partidos = sequelize.define("Partidos", {
    id_partido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    id_estadio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Estadios, key: 'id_estadio' }
    },
    id_torneo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: Torneos, key: 'id_torneo' }
    },
    id_equipo_local: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Equipos, key: 'id_equipo' }
    },
    id_equipo_visitante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Equipos, key: 'id_equipo' }
    },
    id_arbitro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Arbitros, key: 'id_arbitro' }
    },
    resultado: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['id_partido', 'id_torneo']
        }
    ],
});







// Definición del modelo de datos de Entrenadores
const Entrenadores = sequelize.define("Entrenadores", {
    id_entrenador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_entrenador: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    id_equipo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: Equipos, key: 'id_equipo' }
    },
}, {
    timestamps: false,
});


module.exports = {
    sequelize,
    Estadios,
    Ciudades,
    Torneos,
    Partidos,
    Equipos,
    Jugadores,
    Arbitros,
    Entrenadores
};