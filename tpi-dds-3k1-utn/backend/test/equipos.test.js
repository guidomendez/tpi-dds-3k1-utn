const request = require("supertest");
const app = require("../index.js");

const EquipoAlta = {
  id_jugador: 123,
  nombre_equipo: "Fabro FC",
  abreviatura: "FFC"
};

const EquipoModificacion = {
  id_equipo: 123,
  nombre_equipo: "Matias FC",
  abreviatura: "FFC"

};

describe('GET /api/equipos', () => {
  test('Debería responder un statusCode 200', async () => {
    const response = await request(app).get('/api/equipos').send();
    expect(response.statusCode).toBe(200);
  });

  test('Debería devolver un array con objetos', async () => {
    const response = await request(app).get('/api/equipos').send();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id_equipo: expect.any(Number),
          nombre_equipo: expect.any(String),
          abreviatura: expect.any(String)
        })
      ])
    );
  });
});

describe('GET /api/equipos/:id', () => {
  it('Equipos por ID', async () => {
    const res = await request(app).get('/api/equipos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});


describe('GET /api/equipos/nombreEquipo/:nombre', () => {
  it('Equipos por nombre', async () => {
    const res = await request(app).get('/api/equipos/nombreEquipo/Argentina');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});

let equipoId;

describe("POST /api/equipos", () => {
  it("Deberia devolver el equipo que acabo de crear", async () => {
    const res = await request(app).post("/api/equipos").send(EquipoAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_equipo: expect.any(Number),
        nombre_equipo: expect.any(String),
        abreviatura: expect.any(String)
      })
    );
    equipoId = res.body.id_equipo; // Guarda el ID del equipo creado
  });
});


describe('PUT /api/equipos/:id', function () {
  it('Actualizar equipo', async function () {
    const res = await request(app)
      .put(`/api/equipos/${equipoId}`)
      .send(EquipoModificacion);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_equipo: expect.any(Number),
        nombre_equipo: expect.any(String),
        abreviatura: expect.any(String)
      })
    );
  });
});


describe('DELETE /api/equipos/:id', function () {
  it('Eliminar equipo', async function () {
    // Asegúrate de que equipoId tenga un valor antes de usarlo
    if (!equipoId) {
      throw new Error("No se ha creado el equipo, por lo tanto, no se puede eliminar.");
    }
    const res = await request(app).delete(`/api/equipos/${equipoId}`);
    expect(res.statusCode).toBe(200);
    // Ajusta esta expectativa según lo que tu API devuelva al eliminar un equipo
    expect(res.body).toEqual(expect.anything()); // Ajusta según la respuesta esperada
  });
});
