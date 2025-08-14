import React from "react";
import { useForm } from "react-hook-form";

function EntrenadoresActualizar({
  entrenador,
  onGuardarActualizacion,
  onVolver,
  equipos,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    setValue("nombre_entrenador", entrenador.nombre_entrenador);
    setValue("fecha_nacimiento", entrenador.fecha_nacimiento);
    setValue("id_equipo", entrenador.id_equipo);
  }, [entrenador, setValue]);

  const onSubmit = async (data) => {
    onGuardarActualizacion(data);
  };

  const equipo = equipos.find(
    (equipo) => equipo.id_equipo === entrenador.id_equipo
  );

  return (
    <div className="container col-7 card mt-3 p-3">
      <h4 className="mt-2 mb-3">Modificar Entrenador</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
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

        <div className="mb-3">
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
            {equipos.map((e) => (
              <option key={e.id_equipo} value={e.id_equipo}>
                {e.nombre_equipo}
              </option>
            ))}
          </select>
          {errors.id_equipo && (
            <div className="text-danger">{errors.id_equipo.message}</div>
          )}
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Guardar Actualización
          </button>
          <button type="button" className="btn btn-success" onClick={onVolver}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default EntrenadoresActualizar;
