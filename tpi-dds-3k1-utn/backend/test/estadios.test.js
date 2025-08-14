const request = require("supertest");
const app = require("../index.js");


const estadioAlta = {
    nombre_estadio: "Estadio Monumental",
    id_ciudad: 1,
    fecha_inauguracion: "1938-05-25",
    capacidad: 92000,
};


const estadioModificacion = {
    nombre_estadio: "Estadio Monumental Arena",
    id_ciudad: 2,
    fecha_inauguracion: "1938-05-25",
    capacidad: 92000,
};

describe('GET /api/estadios', () => {
    test('Debería responder un statusCode 200', async () => {
        const response = await request(app).get('/api/estadios').send();
        expect(response.statusCode).toBe(200);
    });

    test('Debería devolver un array con objetos', async () => {
        const response = await request(app).get('/api/estadios').send();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id_estadio: expect.any(Number),
                    nombre_estadio: expect.any(String),
                    id_ciudad: expect.any(Number),
                    fecha_inauguracion: expect.any(String),
                    capacidad: expect.any(Number)
                })
            ])
        );
    });
});

describe('GET /api/estadios/:id', () => {
    it('Estadios por ID', async () => {
        const res = await request(app).get('/api/estadios/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
    });
});

describe('GET /api/estadios/nombreEstadio/:nombre', () => {
    it('Estadios por nombre', async () => {
        const res = await request(app).get('/api/estadios/nombreEstadio/San Siro');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
    });
});

let estadioId;

describe("POST /api/estadios", () => {
    it("Deberia devolver el estadio que acabo de crear", async () => {
        const res = await request(app).post("/api/estadios").send(estadioAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id_estadio: expect.any(Number),
                nombre_estadio: expect.any(String),
                id_ciudad: expect.any(Number),
                fecha_inauguracion: expect.any(String),
                capacidad: expect.any(Number)
            })
        );
        estadioId = res.body.id_estadio; // Guarda el ID del estadio creado
    });
});

describe('PUT /api/estadios/:id', function () {
    it('Actualizar estadio', async function () {
        const res = await request(app)
            .put(`/api/estadios/${estadioId}`)
            .send(estadioModificacion);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id_estadio: expect.any(Number),
                nombre_estadio: expect.any(String),
                id_ciudad: expect.any(Number),
                fecha_inauguracion: expect.any(String),
                capacidad: expect.any(Number)
            })
        );
    });
});

describe('DELETE /api/estadios/:id', function () {
    it('Eliminar estadio', async function () {
        // Asegúrate de que estadioID tenga un valor antes de usarlo
        if (!estadioId) {
            throw new Error("No se ha creado el estadio, por lo tanto, no se puede eliminar.");
        }
        const res = await request(app).delete(`/api/estadios/${estadioId}`);
        expect(res.statusCode).toBe(200);
        // Ajusta esta expectativa según lo que tu API devuelva al eliminar un estadio
        expect(res.body).toEqual(expect.anything()); // Ajusta según la respuesta esperada
    });
});
