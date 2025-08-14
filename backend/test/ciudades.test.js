const request = require("supertest");
const app = require("../index.js");

const ciudadAlta = {
    nombre: "Cordoba",
};

const ciudadModificacion = {
    nombre: "Buenos Aires",
};

describe('GET /api/ciudades', () => {
    test('Debería responder un statusCode 200', async () => {
        const response = await request(app).get('/api/ciudades').send();
        expect(response.statusCode).toBe(200);
    });

    test('Debería devolver un array con objetos', async () => {
        const response = await request(app).get('/api/ciudades').send();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id_ciudad: expect.any(Number),
                    nombre: expect.any(String),
                })
            ])
        );
    });
});

describe('GET /api/ciudades/:id', () => {
    it('Ciudades por ID', async () => {
        const res = await request(app).get('/api/ciudades/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
    });
});

describe('GET /api/ciudades/nombreCiudades/:nombre', () => {
    it('Ciudades por nombre', async () => {
        const res = await request(app).get('/api/ciudades/nombreCiudad/Barcelona');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
    });
});

let ciudadId;

describe("POST /api/ciudades", () => {
    it("Deberia devolver la ciudad que acabo de crear", async () => {
        const res = await request(app).post("/api/ciudades").send(ciudadAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id_ciudad: expect.any(Number),
                nombre: expect.any(String),
            })
        );
        ciudadId = res.body.id_ciudad; // Guarda el ID de la ciudad creada
    });
});

describe('PUT /api/ciudades/:id', function () {
    it('Actualizar ciudad', async function () {
        const res = await request(app)
            .put(`/api/ciudades/${ciudadId}`)
            .send(ciudadModificacion);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id_ciudad: expect.any(Number),
                nombre: expect.any(String),
            })
        );
    });
});

describe('DELETE /api/ciudades/:id', function () {
    it('Eliminar ciudad', async function () {
        // Asegúrate de que ciudadID tenga un valor antes de usarlo
        if (!ciudadId) {
            throw new Error("No se ha creado la ciudad, por lo tanto, no se puede eliminar.");
        }
        const res = await request(app).delete(`/api/ciudades/${ciudadId}`);
        expect(res.statusCode).toBe(200);
        // Ajusta esta expectativa según lo que tu API devuelva al eliminar una ciudad
        expect(res.body).toEqual(expect.anything()); // Ajusta según la respuesta esperada
    });
});

