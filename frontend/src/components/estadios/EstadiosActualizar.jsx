import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function EstadiosActualizar({ ciudades, estadio, onGuardarActualizacion, onVolver }) {
  const arArray = [estadio];
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    setValue('nombre_estadio', estadio.nombre_estadio);
    setValue('id_ciudad', estadio.id_ciudad);
    setValue('fecha_inauguracion', estadio.fecha_inauguracion);
    setValue('capacidad', estadio.capacidad);
  }, [estadio, setValue]);

  const onSubmit = async (data) => {
    onGuardarActualizacion(data);
  };

  const tbody = arArray.map(ar => (
    <tr key={ar.id_estadio}>
      <td>{ar.nombre_estadio}</td>
      <td>{ar.id_ciudad}</td>
      <td>{ar.fecha_inauguracion}</td>
      <td>{ar.capacidad}</td>
    </tr>
  ));

  return (
    <>
      <div className="container col-7 card mt-3 p-3">
        <h4 className="mt-2 mb-3">Modificar Estadio</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
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

          <div className="mb-3">
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

          <div className="mb-3">
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

          <div className="mb-3">
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
