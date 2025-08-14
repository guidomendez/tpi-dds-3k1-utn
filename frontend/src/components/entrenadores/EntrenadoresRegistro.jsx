import { useForm } from "react-hook-form";

export default function EntrenadoresRegistro(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="container col-7 card mt-3 p-3">
      <h4 className="mt-2 mb-3">Registro de Entrenadores</h4>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <div className="mb-2">
          <label htmlFor="nombre_entrenador" className="form-label">
            Nombre del Entrenador:
          </label>
          <input
            type="text"
            id="nombre_entrenador"
            className="form-control"
            {...register("nombre_entrenador", {
              required: "Este campo es requerido",
            })}
          />
          {errors.nombre_entrenador && (
            <div className="text-danger">
              {errors.nombre_entrenador.message}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="fecha_nacimiento" className="form-label">
            Fecha de Nacimiento:
          </label>
          <input
            type="date"
            id="fecha_nacimiento"
            className="form-control"
            {...register("fecha_nacimiento", {
              required: "Este campo es requerido",
            })}
          />
          {errors.fecha_nacimiento && (
            <div className="text-danger">{errors.fecha_nacimiento.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="id_equipo" className="form-label">
            Equipo:
          </label>
          <select
            id="id_equipo"
            className="form-select"
            defaultValue=""
            {...register("id_equipo", {
              required: "Este campo es requerido",
            })}
          >
            <option value="" disabled>
              Seleccione un equipo
            </option>
            {props.equipos.map((e) => (
              <option key={e.id_equipo} value={e.id_equipo}>
                {e.nombre_equipo}
              </option>
            ))}
          </select>
          {errors.id_equipo && (
            <div className="text-danger">{errors.id_equipo.message}</div>
          )}
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Registrar
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-2"
            onClick={props.activarConsulta}
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}
