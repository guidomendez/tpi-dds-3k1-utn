import React from 'react';
import { useForm } from 'react-hook-form';

function Actualizar({ arbitro, onGuardarActualizacion, onVolver }) {
  const arArray = [arbitro];
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  React.useEffect(() => {
    setValue('nombre_arbitro', arbitro.nombre_arbitro);
    setValue('fecha_nacimiento', arbitro.fecha_nacimiento);
  }, [arbitro, setValue]);

  const onSubmit = async (data) => {
    onGuardarActualizacion(data);
  };

  const tbody = arArray.map(ar => (
    <tr key={ar.id_arbitro}>
      <td>{ar.nombre_arbitro}</td>
      <td>{ar.fecha_nacimiento}</td>
    </tr>
  ));

  return (
    <div className="container col-7 card mt-3 p-3">
      <h4 className="mt-2 mb-3">Actualizar Árbitro</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label htmlFor="nombre_arbitro" className="form-label">
            Nombre del Árbitro:
          </label>
          <input
            id="nombre_arbitro"
            type="text"
            className={`form-control ${errors.nombre_arbitro ? 'is-invalid' : ''}`}
            {...register('nombre_arbitro', {
              required: 'El nombre es obligatorio',
            })}
          />
          {errors.nombre_arbitro && (
            <div className="text-danger">{errors.nombre_arbitro.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="fecha_nacimiento" className="form-label">
            Fecha de Nacimiento:
          </label>
          <input
            id="fecha_nacimiento"
            type="date"
            className={`form-control ${errors.fecha_nacimiento ? 'is-invalid' : ''}`}
            {...register('fecha_nacimiento', {
              required: 'La fecha de nacimiento es obligatoria',
            })}
          />
          {errors.fecha_nacimiento && (
            <div className="text-danger">{errors.fecha_nacimiento.message}</div>
          )}
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-2"
            onClick={onVolver}
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}

export default Actualizar;
