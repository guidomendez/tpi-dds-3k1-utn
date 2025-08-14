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
      <h4 className="mt-2 mb-3">Registro de Árbitro</h4>
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
              required: 'El nombre del árbitro es requerido',
              maxLength: {
                value: 50,
                message: 'El nombre no puede tener más de 50 caracteres',
              },
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
              required: 'La fecha de nacimiento es requerida',
            })}
          />
          {errors.fecha_nacimiento && (
            <div className="text-danger">{errors.fecha_nacimiento.message}</div>
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
