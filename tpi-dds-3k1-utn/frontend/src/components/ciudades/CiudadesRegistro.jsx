import React from 'react';
import { useForm } from 'react-hook-form';

export default function Registro({ onSubmit, activarConsulta }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="container col-7 card mt-3 p-3">
      <h4 className="mt-2 mb-3">Registro de Ciudad</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre de la Ciudad
          </label>
          <input
            id="nombre"
            type="text"
            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
            {...register('nombre', {
              required: 'El nombre de la ciudad es requerido',
              maxLength: {
                value: 50,
                message: 'El nombre no puede tener más de 50 caracteres',
              },
            })}
          />
          {errors.nombre && (
            <div className="invalid-feedback">{errors.nombre.message}</div>
          )}
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Registrar
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-2"
            onClick={activarConsulta}
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}
