// Acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
    try {
        // Abrir base de datos (si no existe, la crea)
        await db.open("./.data/tp-bd.db");

        // Verificar si la tabla Equipos existe
        let res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Equipos'",
            []
        );

        if (res.contar === 0) {
            await db.run(
                `CREATE TABLE Equipos (
                    id_equipo INTEGER PRIMARY KEY AUTOINCREMENT, 
                    nombre_equipo TEXT NOT NULL, 
                    abreviatura TEXT NOT NULL
                );`
            );
            console.log("Tabla Equipos creada!");

            // Insertar registros en la tabla Equipos
            await db.run(
                `INSERT INTO Equipos (nombre_equipo, abreviatura) VALUES 
                    ('Argentina', 'ARG'),
                    ('Brasil', 'BRA'),
                    ('Chile', 'CHI'),
                    ('Colombia', 'COL'),
                    ('Venezuela', 'VEN'),
                    ('Estados Unidos', 'USA'),
                    ('México', 'MEX'),
                    ('Canadá', 'CAN'),
                    ('España', 'ESP'),
                    ('Francia', 'FRA'),
                    ('Italia', 'ITA'),
                    ('Alemania', 'ALE'),
                    ('Rusia', 'RUS'),
                    ('China', 'CHI'),
                    ('Japón', 'JPN'),
                    ('Corea del Sur', 'KOR'),
                    ('Australia', 'AUS'),
                    ('Nueva Zelanda', 'NZL'),
                    ('Inglaterra', 'ENG'),
                    ('Portugal', 'POR'),
                    ('Países Bajos', 'NED'),
                    ('Bélgica', 'BEL'),
                    ('Suiza', 'SUI'),
                    ('Suecia', 'SWE'),
                    ('Noruega', 'NOR'),
                    ('Dinamarca', 'DEN'),
                    ('Finlandia', 'FIN'),
                    ('Irlanda', 'IRL'),
                    ('Escocia', 'SCO'),
                    ('Gales', 'WAL'),
                    ('Croacia', 'CRO'),
                    ('Serbia', 'SRB'),
                    ('Grecia', 'GRE'),
                    ('Turquía', 'TUR'),
                    ('Sudáfrica', 'RSA');`
            );
        }

        // Verificar si la tabla Jugadores existe
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Jugadores'",
            []
        );

        if (res.contar === 0) {
            await db.run(
                `CREATE TABLE Jugadores (
                    id_jugador INTEGER PRIMARY KEY AUTOINCREMENT, 
                    nombre_jugador TEXT NOT NULL,
                    fecha_nacimiento DATE NOT NULL,
                    posicion TEXT NOT NULL,
                    id_equipo INT,
                    FOREIGN KEY (id_equipo) REFERENCES Equipos(id_equipo)
                );`
            );
            console.log("Tabla Jugadores creada!");

            // Insertar registros en la tabla Jugadores
            await db.run(
                `INSERT INTO Jugadores (nombre_jugador, fecha_nacimiento, posicion, id_equipo) VALUES 
                    ('Lionel Messi', '1987-06-24', 'Delantero', 1),
                    ('Cristiano Ronaldo', '1985-02-05', 'Delantero', 2),
                    ('Neymar Jr.', '1992-02-05', 'Delantero', 3),
                    ('Kevin De Bruyne', '1991-06-28', 'Centrocampista', 4),
                    ('Robert Lewandowski', '1988-08-21', 'Delantero', 5),
                    ('Virgil van Dijk', '1991-07-08', 'Defensa', 6),
                    ('Kylian Mbappé', '1998-12-20', 'Delantero', 7),
                    ('Sergio Ramos', '1986-03-30', 'Defensa', 8),
                    ('Luka Modric', '1985-09-09', 'Centrocampista', 9),
                    ('Jan Oblak', '1993-01-07', 'Portero', 10),
                    ('Mohamed Salah', '1992-06-15', 'Delantero', 11),
                    ('Harry Kane', '1993-07-28', 'Delantero', 12),
                    ('Raheem Sterling', '1994-12-08', 'Delantero', 13),
                    ('Eden Hazard', '1991-01-07', 'Delantero', 14),
                    ('Antoine Griezmann', '1991-03-21', 'Delantero', 15);`
            );
        }

        // Verificar si la tabla Torneos existe
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Torneos'",
            []
        );

        if (res.contar === 0) {
            await db.run(
                `CREATE TABLE Torneos (
                    id_torneo INTEGER PRIMARY KEY AUTOINCREMENT, 
                    nombre_torneo TEXT NOT NULL, 
                    año INTEGER NOT NULL
                );`
            );
            console.log("Tabla Torneos creada!");

            // Insertar registros en la tabla Torneos
            await db.run(
                `INSERT INTO Torneos (nombre_torneo, año) VALUES 
                    ('Torneo Apertura', 2023),
                    ('Copa Verano', 2023),
                    ('Campeonato Primavera', 2023),
                    ('Torneo Clausura', 2023),
                    ('Copa Invierno', 2023),
                    ('Liga Nacional', 2024),
                    ('Torneo Otoño', 2024),
                    ('Campeonato Juvenil', 2024),
                    ('Copa América', 2024),
                    ('Mundial', 2026);`
            );
        }

        // Verificar si la tabla Partidos existe
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Partidos'",
            []
        );

        if (res.contar === 0) {
            await db.run(
                `CREATE TABLE Partidos (
            id_partido INTEGER PRIMARY KEY, 
            fecha DATE NOT NULL, 
            id_estadio INTEGER NOT NULL, 
            id_torneo INTEGER NOT NULL, 
            id_equipo_local INTEGER NOT NULL, 
            id_equipo_visitante INTEGER NOT NULL, 
            id_arbitro INTEGER NOT NULL, 
            resultado VARCHAR(50),
            FOREIGN KEY (id_estadio) REFERENCES Estadios(id_estadio),
            FOREIGN KEY (id_torneo) REFERENCES Torneos(id_torneo),
            FOREIGN KEY (id_equipo_local) REFERENCES Equipos(id_equipo),
            FOREIGN KEY (id_equipo_visitante) REFERENCES Equipos(id_equipo),
            FOREIGN KEY (id_arbitro) REFERENCES Arbitros(id_arbitro)
        );`
            );
            console.log("Tabla Partidos creada!");

            // Insertar registros en la tabla Partidos con id_arbitro
            await db.run(
                `INSERT INTO Partidos (id_partido, fecha, id_estadio, id_torneo, id_equipo_local, id_equipo_visitante, id_arbitro, resultado) VALUES 
            (1, '2023-06-01', 1, 1, 1, 2, 1, '2-1'),
            (2, '2023-06-02', 2, 1, 3, 4, 2, '0-0'),
            (3, '2023-06-03', 3, 1, 5, 6, 3, '1-3'),
            (4, '2023-06-04', 4, 2, 7, 8, 1, '4-2'),
            (5, '2023-06-05', 5, 2, 9, 10, 2, '2-2'),
            (6, '2023-06-06', 6, 2, 11, 12, 3, '1-0'),
            (7, '2023-06-07', 7, 3, 13, 14, 1, '3-3'),
            (8, '2023-06-08', 8, 3, 15, 16, 2, '0-1'),
            (9, '2023-06-09', 9, 3, 17, 18, 3, '2-0'),
            (10, '2023-06-10', 10, 4, 19, 20, 1, '1-1');`
            );
        }

        // Verificar si la tabla Entrenadores existe
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Entrenadores'",
            []
        );

        if (res.contar === 0) {
            await db.run(
                `CREATE TABLE Entrenadores (
                    id_entrenador INTEGER PRIMARY KEY AUTOINCREMENT, 
                    nombre_entrenador TEXT NOT NULL, 
                    fecha_nacimiento DATE NOT NULL, 
                    id_equipo INTEGER NOT NULL,
                    FOREIGN KEY (id_equipo) REFERENCES Equipos(id_equipo)
                );`
            );
            console.log("Tabla Entrenadores creada!");

            // Insertar registros en la tabla Entrenadores
            await db.run(
                `INSERT INTO Entrenadores (nombre_entrenador, fecha_nacimiento, id_equipo) VALUES
                    ('Carlos Bianchi', '1980-04-15', 5),
                    ('Sebastian Diaz', '1975-06-20', 2),
                    ('Carlos Ancellotti', '1982-08-10', 8),
                    ('Ramon Diaz', '1988-12-05', 1),
                    ('Diego Rodríguez', '1990-01-25', 7),
                    ('José Fernández', '1985-03-18', 10),
                    ('Fernando González', '1978-09-30', 3),
                    ('Sergio Sánchez', '1992-11-11', 6),
                    ('Antonio Torres', '1981-07-22', 9),
                    ('Alejandro Morales', '1987-05-08', 4);`
            );
        }

        // Verificar si la tabla Arbitros existe
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Arbitros'",
            []
        );

        if (res.contar === 0) {
            await db.run(
                `CREATE TABLE Arbitros (
                    id_arbitro INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre_arbitro TEXT NOT NULL,
                    fecha_nacimiento DATE NOT NULL
                );`
            );
            console.log("Tabla Arbitros creada!");

            // Insertar registros en la tabla Arbitros
            await db.run(
                `INSERT INTO Arbitros (nombre_arbitro, fecha_nacimiento) VALUES
                    ('Mark Clattenburg', '1975-03-13'),
                    ('Pierluigi Collina', '1960-02-13'),
                    ('Howard Webb', '1971-07-14'),
                    ('Felix Brych', '1975-08-03'),
                    ('Björn Kuipers', '1973-03-28'),
                    ('Cüneyt Çakir', '1976-11-23'),
                    ('Ravshan Irmatov', '1977-08-09'),
                    ('Nestor Pitana', '1975-06-17'),
                    ('Nicola Rizzoli', '1971-10-05'),
                    ('Sandro Ricci', '1974-11-15');`
            );
        }
        // Verificar si la tabla Ciudades existe
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type='table' AND name='Ciudades'",
            []
        );

        if (res.contar === 0) {
            await db.run(
                `CREATE TABLE Ciudades (
            id_ciudad INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL
        );`
            );
            console.log("Tabla Ciudades creada!");

            // Insertar registros en la tabla Ciudades
            await db.run(
                `INSERT INTO Ciudades (nombre) VALUES
            ('Ciudad de México'),
            ('Barcelona'),
            ('Madrid'),
            ('Londres'),
            ('Milán'),
            ('Río de Janeiro'),
            ('Múnich'),
            ('Mánchester'),
            ('Saint-Denis'),
            ('Dortmund');`
            );
        }

        // Verificar si la tabla Estadios existe
        res = await db.get(
            "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Estadios'",
            []
        );

        if (res.contar !== 0) {
            // Si la tabla ya existe, elimínala
            await db.run("DROP TABLE Estadios");
            console.log("Tabla Estadios eliminada!");
        }

        // Crear la tabla Estadios
        await db.run(
            `CREATE TABLE Estadios (
        id_estadio INTEGER PRIMARY KEY AUTOINCREMENT, 
        nombre_estadio TEXT NOT NULL, 
        id_ciudad INTEGER, 
        fecha_inauguracion DATE NOT NULL, 
        capacidad INTEGER,
        FOREIGN KEY (id_ciudad) REFERENCES Ciudades(id_ciudad)
    );`
        );
        console.log("Tabla Estadios creada!");

        // Insertar registros en la tabla Estadios
        await db.run(
            `INSERT INTO Estadios (nombre_estadio, id_ciudad, fecha_inauguracion, capacidad) VALUES 
        ('Estadio Azteca', 1, '1966-05-29', 87000),
        ('Camp Nou', 2, '1957-09-24', 99354),
        ('Santiago Bernabéu', 3, '1947-12-14', 81044),
        ('Wembley', 4, '2007-03-09', 90000),
        ('San Siro', 5, '1926-09-19', 80018),
        ('Maracanã', 6, '1950-06-16', 78838),
        ('Allianz Arena', 7, '2005-05-30', 75000),
        ('Old Trafford', 8, '1910-02-19', 74879),
        ('Stade de France', 9, '1998-01-28', 81338),
        ('Signal Iduna Park', 10, '1974-04-02', 81365);`
        );




        // Cerrar conexión a la base de datos
        await db.close();
    }
    catch (error) {
        console.log(error);
    }
}
CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
