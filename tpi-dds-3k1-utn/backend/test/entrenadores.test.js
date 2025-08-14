const request = require("supertest");
const app = require("../index.js");

const entrenadorAlta = {
    nombre_entrenador: "Matias Negrelli",
    fecha_nacimiento: "1990-01-01",
    id_equipo: 1
};

const entrenardorModificacion = {
    nombre_entrenador: "Guido Mendez",
    fecha_nacimiento: "1990-01-01",
    id_equipo: 1
};

describe('GET /api/entrenadores', () => {
    test('Debería responder un statusCode 200', async () => {
        const response = await request(app).get('/api/entrenadores').send();
        expect(response.statusCode).toBe(200);
    });

    test('Debería devolver un array con objetos', async () => {
        const response = await request(app).get('/api/entrenadores').send();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id_entrenador: expect.any(Number),
                    nombre_entrenador: expect.any(String),
                    fecha_nacimiento: expect.any(String),
                    id_equipo: expect.any(Number)
                })
            ])
        );
    });
});

describe('GET /api/entrenadores/:id', () => {
    it('Entrenadores por ID', async () => {
        const res = await request(app).get('/api/entrenadores/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
    });
});

describe('GET /api/entrenadores/nombreEntrenador/:nombre', () => {
    it('Entrenadores por nombre', async () => {
        const res = await request(app).get('/api/entrenadores/nombreEntrenador/Sebastian Diaz');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
    });
});

let entrenadorId;

describe("POST /api/entrenadores", () => {
    it("Deberia devolver el entrenador que acabo de crear", async () => {
        const res = await request(app).post("/api/entrenadores").send(entrenadorAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id_entrenador: expect.any(Number),
                nombre_entrenador: expect.any(String),
                fecha_nacimiento: expect.any(String),
                id_equipo: expect.any(Number)
            })
        );
        entrenadorId = res.body.id_entrenador; // Guarda el ID del entrenador creado
    });
});

describe('PUT /api/entrenadores/:id', function () {
    it('Actualizar entrenador', async function () {
        const res = await request(app)
            .put(`/api/entrenadores/${entrenadorId}`)
            .send(entrenardorModificacion);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                id_entrenador: expect.any(Number),
                nombre_entrenador: expect.any(String),
                fecha_nacimiento: expect.any(String),
                id_equipo: expect.any(Number)
            })
        );
    });
});

describe('DELETE /api/entrenadores/:id', function () {
    it('Eliminar arbitro', async function () {
        // Asegúrate de que entrenadorId tenga un valor antes de usarlo
        if (!entrenadorId) {
            throw new Error("No se ha creado el entrenador, por lo tanto, no se puede eliminar.");
        }
        const res = await request(app).delete(`/api/entrenadores/${entrenadorId}`);
        expect(res.statusCode).toBe(200);
        // Ajusta esta expectativa según lo que tu API devuelva al eliminar un partido
        expect(res.body).toEqual(expect.anything()); // Ajusta según la respuesta esperada
    });
});
