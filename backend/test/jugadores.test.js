const request = require("supertest");
const app = require("../index.js");

const jugadorAlta = {
    id_jugador: 99,
    nombre_jugador: "Fabrizio",
    fecha_nacimiento: "1990-01-01",
    posicion: "Delantero",
    id_equipo: 1,

};

const jugadorModificacion = {
    id_jugador: 99,
    nombre_jugador: "German",
    fecha_nacimiento: "1990-01-01",
    posicion: "Delantero",
    id_equipo: 1,

};

describe('GET /api/jugadores', () => {
    test('Debería responder un statusCode 200', async () => {
        const response = await request(app).get('/api/jugadores').send();
        expect(response.statusCode).toBe(200);
    });

    test('Debería devolver un array con objetos', async () => {
        const response = await request(app).get('/api/jugadores').send();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id_jugador: expect.any(Number),
                    nombre_jugador: expect.any(String),
                    fecha_nacimiento: expect.any(String),
                    posicion: expect.any(String),
                    id_equipo: expect.any(Number)
                })
            ])
        );
    });
});


describe('GET /api/jugadores/:id', () => {
    it('Jugadores por ID', async () => {
        const res = await request(app).get('/api/jugadores/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
    });
});

describe('GET /api/jugadores/nombreJugador/:nombre', () => {
    it('Equipos por nombre', async () => {
        const res = await request(app).get('/api/jugadores/nombreJugador/Lionel Messi');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
    });
});

let jugadorId;


describe("POST /api/jugadores", () => {
    it("Deberia devolver el jugador que acabo de crear", async () => {
        const res = await request(app).post("/api/jugadores").send(jugadorAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id_jugador: expect.any(Number),
                nombre_jugador: expect.any(String),
                fecha_nacimiento: expect.any(String),
                posicion: expect.any(String),
                id_equipo: expect.any(Number)
            })
        );
        jugadorId = res.body.id_jugador; // Guarda el ID del jugador creado
    });
});


describe('PUT /api/jugadores/:id', function () {
    it('Actualizar jugador', async function () {
        const res = await request(app)
            .put(`/api/jugadores/${jugadorId}`)
            .send(jugadorModificacion);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id_jugador: expect.any(Number),
                nombre_jugador: expect.any(String),
                fecha_nacimiento: expect.any(String),
                posicion: expect.any(String),
                id_equipo: expect.any(Number)
            })
        );
    });
});


describe('DELETE /api/jugadores/:id', function () {
    it('Eliminar jugador', async function () {
        // Asegúrate de que jugadorId tenga un valor antes de usarlo
        if (!jugadorId) {
            throw new Error("No se ha creado el jugador, por lo tanto, no se puede eliminar.");
        }
        const res = await request(app).delete(`/api/jugadores/${jugadorId}`);
        expect(res.statusCode).toBe(200);
        // Ajusta esta expectativa según lo que tu API devuelva al eliminar un jugador
        expect(res.body).toEqual(expect.anything()); // Ajusta según la respuesta esperada
    });
});