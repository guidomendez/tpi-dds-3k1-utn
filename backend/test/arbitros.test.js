const request = require("supertest");
const app = require("../index.js");


const arbitroAlta = {
    nombre_arbitro: "Matias",
    fecha_nacimiento: "1990-01-01"
};

const arbitroModificacion = {
    nombre_arbitro: "Ramon",
    fecha_nacimiento: "1990-01-01"

};


describe('GET /api/arbitros', () => {
    test('Debería responder un statusCode 200', async () => {
        const response = await request(app).get('/api/arbitros').send();
        expect(response.statusCode).toBe(200);
    });
  
    test('Debería devolver un array con objetos', async () => {
        const response = await request(app).get('/api/arbitros').send();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id_arbitro: expect.any(Number),
                    nombre_arbitro: expect.any(String),
                    fecha_nacimiento: expect.any(String)
                })
            ])
        );
    });
  });
  
describe('GET /api/arbitros/:id', () => {
    it('Arbitros por ID', async () => {
      const res = await request(app).get('/api/arbitros/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
    });
  });

  describe('GET /api/arbitros/nombreArbitro/:nombre', () => {
    it('Arbitros por nombre', async () => {
      const res = await request(app).get('/api/arbitros/nombreArbitro/Felix Brych');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
    });
  });


let arbitroId;

describe("POST /api/arbitros", () => {
    it("Deberia devolver el arbitro que acabo de crear", async () => {
      const res = await request(app).post("/api/arbitros").send(arbitroAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            id_arbitro: expect.any(Number),
            nombre_arbitro: expect.any(String),
            fecha_nacimiento: expect.any(String)
        })
      );
      arbitroId = res.body.id_arbitro; // Guarda el ID del arbitro creado
    });
  });

describe('PUT /api/arbitros/:id', function () {
    it('Actualizar arbitro', async function () {
      const res = await request(app)
        .put(`/api/arbitros/${arbitroId}`)
        .send(arbitroModificacion);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            id_arbitro: expect.any(Number),
            nombre_arbitro: expect.any(String),
            fecha_nacimiento: expect.any(String)
        })
      );
    });
  });

  describe('DELETE /api/arbitros/:id', function () {
    it('Eliminar arbitro', async function () {
      // Asegúrate de que arbitroId tenga un valor antes de usarlo
      if (!arbitroId) {
        throw new Error("No se ha creado el arbitro, por lo tanto, no se puede eliminar.");
      }
      const res = await request(app).delete(`/api/arbitros/${arbitroId}`);
      expect(res.statusCode).toBe(200);
      // Ajusta esta expectativa según lo que tu API devuelva al eliminar un arbitro
      expect(res.body).toEqual(expect.anything()); // Ajusta según la respuesta esperada
    });
  });
