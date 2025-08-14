const request = require("supertest");
const app = require("../index.js");
const { NUMBER } = require("sequelize");

const torneoAlta = {
    nombre_torneo: " Copa Manager",
    año: "1938-05-25",
};

const torneoModificacion = {
    nombre_torneo: " Copa Plata",
    año: "1938-05-25",
};

describe('GET /api/torneos', () => {
    test('Debería responder un statusCode 200', async () => {
        const response = await request(app).get('/api/torneos').send();
        expect(response.statusCode).toBe(200);
    });

    test('Debería devolver un array con objetos', async () => {
        const response = await request(app).get('/api/torneos').send();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id_torneo: expect.any(Number),
                    nombre_torneo: expect.any(String),
                    año : expect.any(Number),
                })
            ])
        );
    });
});

describe('GET /api/torneos/:id', () => {
    it('Torneos por ID', async () => {
        const res = await request(app).get('/api/torneos/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
    });
});

describe('GET /api/torneos/nombreTorneo/:nombre', () => {
    it('Estadios por nombre', async () => {
        const res = await request(app).get('/api/torneos/nombreTorneo/Torneo Apertura');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
    });
});

let torneoId;

describe("POST /api/torneos", () => {
    it("Deberia devolver el torneo que acabo de crear", async () => {
        const res = await request(app).post("/api/torneos").send(torneoAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id_torneo: expect.any(Number),
                nombre_torneo: expect.any(String),
                año : expect.any(String),
            })
        );
        torneoId = res.body.id_torneo; // Guarda el ID del torneo creado
    });
});

describe('PUT /api/torneos/:id', function () {
    it('Actualizar torneo', async function () {
        const res = await request(app)
            .put(`/api/torneos/${torneoId}`)
            .send(torneoModificacion);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id_torneo: expect.any(Number),
                nombre_torneo: expect.any(String),
                año : expect.any(String),
            })
        );
    });
});

describe('DELETE /api/torneos/:id', function () {
    it('Eliminar torneo', async function () {
        // Asegúrate de que estadioID tenga un valor antes de usarlo
        if (!torneoId) {
            throw new Error("No se ha creado el torneo, por lo tanto, no se puede eliminar.");
        }
        const res = await request(app).delete(`/api/torneos/${torneoId}`);
        expect(res.statusCode).toBe(200);
        // Ajusta esta expectativa según lo que tu API devuelva al eliminar un estadio
        expect(res.body).toEqual(expect.anything()); // Ajusta según la respuesta esperada
    });
});

