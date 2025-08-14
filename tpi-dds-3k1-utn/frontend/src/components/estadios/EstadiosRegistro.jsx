import { useForm } from "react-hook-form";

export default function EstadioRegistro({ registrarEstadios, activarListado, ciudades }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="container col-7 card mt-3 p-3">
      <h4 className="mt-2 mb-3">Registrar Estadio</h4>
      <form onSubmit={handleSubmit(registrarEstadios)}>
        <div className="mb-2">
          <label htmlFor="nombre_estadio" className="form-label">
            Nombre del Estadio:
          </label>
          <input
            type="text"
            id="nombre_estadio"
            className="form-control"
            {...register("nombre_estadio", { required: "Nombre estadio es requerido" })}
          />
          {errors.nombre_estadio && (
            <div className="text-danger">{errors.nombre_estadio.message}</div>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="id_ciudad" className="form-label">
            Ciudad:
          </label>
          <select
            id="id_ciudad"
            className="form-select"
            defaultValue=""
            {...register("id_ciudad", { required: "Ciudad es requerida" })}
          >
            <option value="" disabled>Seleccione una opción</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad.id_ciudad} value={ciudad.id_ciudad}>
                {ciudad.nombre}
              </option>
            ))}
          </select>
          {errors.id_ciudad && (
            <div className="text-danger">{errors.id_ciudad.message}</div>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="fecha_inauguracion" className="form-label">
            Fecha Inauguración:
          </label>
          <input
            type="date"
            id="fecha_inauguracion"
            className="form-control"
            {...register("fecha_inauguracion", { required: "Fecha inauguración es requerida" })}
          />
          {errors.fecha_inauguracion && (
            <div className="text-danger">{errors.fecha_inauguracion.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="capacidad" className="form-label">
            Capacidad:
          </label>
          <input
            type="number"
            id="capacidad"
            className="form-control"
            {...register("capacidad", { required: "Capacidad es requerida" })}
          />
          {errors.capacidad && (
            <div className="text-danger">{errors.capacidad.message}</div>
          )}
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Confirmar
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-2"
            onClick={activarListado}
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}
