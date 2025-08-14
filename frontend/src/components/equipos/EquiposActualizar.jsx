import React from "react";
import { useForm } from "react-hook-form";

function EquiposActualizar({
  equipo,
  onGuardarActualizacion,
  onVolver
}) {
  const eqArray = [equipo];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    setValue("nombre_equipo", equipo.nombre_equipo);
    setValue("abreviatura", equipo.abreviatura);
  }, [equipo, setValue]);

  const onSubmit = async (data) => {
    onGuardarActualizacion(data);
  };

  const tbody = eqArray.map((ar) => (
    <tr key={ar.id_equipo}>
      <td>{ar.nombre_equipo}</td>
      <td>{ar.abreviatura}</td>
    </tr>
  ));

  return (
    <>
      <div className="container col-7 card mt-3 p-3">
        <h4 className="mt-2 mb-3">Modificar Equipo</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="nombre_equipo" className="form-label">
              Nombre del Equipo:
            </label>
            <input
              type="text"
              id="nombre_equipo"
              className="form-control"
              {...register("nombre_equipo", {
                required: "Este campo es requerido",
              })}
            />
            {errors.nombre_equipo && (
              <div className="text-danger">{errors.nombre_equipo.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="abreviatura" className="form-label">
              Abreviatura:
            </label>
            <input
              type="text"
              id="abreviatura"
              className="form-control"
              {...register("abreviatura", {
                required: "Este campo es requerido",
              })}
            />
            {errors.abreviatura && (
              <div className="text-danger">{errors.abreviatura.message}</div>
            )}
          </div>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary me-2">
              Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onVolver}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EquiposActualizar;
