const request = require("supertest");
const app = require("../index.js");

const partidoAlta = {
    fecha: "1990-01-01",
    id_estadio: 1,
    id_torneo: 1,
    id_equipo_local: 1,
    id_equipo_visitante: 2,
    id_arbitro: 3,
    resultado: "2-1"
};


const partidoModificacion = {
    fecha: "1990-01-01",
    id_estadio: 1,
    id_torneo: 1,
    id_equipo_local: 1,
    id_equipo_visitante: 2,
    id_arbitro: 3,
    resultado: "2-1"
};

describe('GET /api/partidos', () => {
    test('Debería responder un statusCode 200', async () => {
        const response = await request(app).get('/api/partidos').send();
        expect(response.statusCode).toBe(200);
    });

    test('Debería devolver un array con objetos', async () => {
        const response = await request(app).get('/api/partidos').send();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id_partido: expect.any(Number),
                    fecha: expect.any(String),
                    id_estadio: expect.any(Number),
                    id_torneo: expect.any(Number),
                    id_equipo_local: expect.any(Number),
                    id_equipo_visitante: expect.any(Number),
                    id_arbitro: expect.any(Number),
                    resultado: expect.any(String)
                })
            ])
        );
    });
});

describe('GET /api/partidos/:id', () => {
    it('Partidos por ID', async () => {
        const res = await request(app).get('/api/partidos/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
    });
});

let partidoId;

describe("POST /api/partidos", () => {
    it("Deberia devolver el partido que acabo de crear", async () => {
        const res = await request(app).post("/api/partidos").send(partidoAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id_partido: expect.any(Number),
                fecha: expect.any(String),
                id_estadio: expect.any(Number),
                id_torneo: expect.any(Number),
                id_equipo_local: expect.any(Number),
                id_equipo_visitante: expect.any(Number),
                id_arbitro: expect.any(Number),
                resultado: expect.any(String)
            })
        );
        partidoId = res.body.id_partido; // Guarda el ID del partido creado
    });
});

describe('PUT /api/partidos/:id', function () {
    it('Actualizar partido', async function () {
        const res = await request(app)
            .put(`/api/partidos/${partidoId}`)
            .send(partidoModificacion);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id_partido: expect.any(Number),
                fecha: expect.any(String),
                id_estadio: expect.any(Number),
                id_torneo: expect.any(Number),
                id_equipo_local: expect.any(Number),
                id_equipo_visitante: expect.any(Number),
                id_arbitro: expect.any(Number),
                resultado: expect.any(String)
            })
        );
    });
});

describe('DELETE /api/partidos/:id', function () {
    it('Eliminar partido', async function () {
        // Asegúrate de que partidoID tenga un valor antes de usarlo
        if (!partidoId) {
            throw new Error("No se ha creado el partido, por lo tanto, no se puede eliminar.");
        }
        const res = await request(app).delete(`/api/partidos/${partidoId}`);
        expect(res.statusCode).toBe(200);
        // Ajusta esta expectativa según lo que tu API devuelva al eliminar un partido
        expect(res.body).toEqual(expect.anything()); // Ajusta según la respuesta esperada
    });
});
