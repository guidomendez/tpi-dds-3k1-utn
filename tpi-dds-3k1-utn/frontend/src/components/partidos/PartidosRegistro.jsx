import { useForm } from 'react-hook-form';

export default function PartidosRegistro(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="container col-7 card mt-3 p-3">
      <h4 className="mt-2 mb-3">Registrar Partido</h4>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <div className="mb-2">
          <label htmlFor='fecha' className="form-label">Fecha</label>
          <input
            type='date'
            id='fecha'
            className="form-control"
            {...register("fecha", { required: 'La fecha es requerida' })}
          />
          {errors.fecha && <div className="text-danger">{errors.fecha.message}</div>}
        </div>

        <div className="mb-2">
          <label htmlFor='id_estadio' className="form-label">Estadio</label>
          <select
            id='id_estadio'
            className="form-control"
            defaultValue=""
            {...register("id_estadio", { required: 'El estadio es requerido' })}
          >
            <option value="" disabled></option>
            {props.estadios.map((e) => (
              <option key={e.id_estadio} value={e.id_estadio}>
                {e.nombre_estadio}
              </option>
            ))}
          </select>
          {errors.id_estadio && <div className="text-danger">{errors.id_estadio.message}</div>}
        </div>

        <div className="mb-2">
          <label htmlFor='id_torneo' className="form-label">Torneo</label>
          <select
            id='id_torneo'
            className="form-control"
            defaultValue=""
            {...register("id_torneo", { required: 'El torneo es requerido' })}
          >
            <option value="" disabled></option>
            {props.torneo.map((e) => (
              <option key={e.id_torneo} value={e.id_torneo}>
                {e.nombre_torneo}
              </option>
            ))}
          </select>
          {errors.id_torneo && <div className="text-danger">{errors.id_torneo.message}</div>}
        </div>

        <div className="mb-2">
          <label htmlFor='id_equipo_local' className="form-label">Equipo Local</label>
          <select
            id="id_equipo_local"
            className="form-control"
            defaultValue=""
            {...register("id_equipo_local", { required: 'El equipo local es requerido' })}
          >
            <option value="" disabled></option>
            {props.equipoLocal.map((e) => (
              <option key={e.id_equipo} value={e.id_equipo}>
                {e.nombre_equipo}
              </option>
            ))}
          </select>
          {errors.id_equipo_local && <div className="text-danger">{errors.id_equipo_local.message}</div>}
        </div>

        <div className="mb-2">
          <label htmlFor='id_equipo_visitante' className="form-label">Equipo Visitante</label>
          <select
            id="id_equipo_visitante"
            className="form-control"
            defaultValue=""
            {...register("id_equipo_visitante", { required: 'El equipo visitante es requerido' })}
          >
            <option value="" disabled></option>
            {props.equipoVisitante.map((e) => (
              <option key={e.id_equipo} value={e.id_equipo}>
                {e.nombre_equipo}
              </option>
            ))}
          </select>
          {errors.id_equipo_visitante && <div className="text-danger">{errors.id_equipo_visitante.message}</div>}
        </div>

        <div className="mb-2">
          <label htmlFor='id_arbitro' className="form-label">Árbitro</label>
          <select
            id='id_arbitro'
            className="form-control"
            defaultValue=""
            {...register("id_arbitro", { required: 'El árbitro es requerido' })}
          >
            <option value="" disabled></option>
            {props.arbitros.map((e) => (
              <option key={e.id_arbitro} value={e.id_arbitro}>
                {e.nombre_arbitro}
              </option>
            ))}
          </select>
          {errors.id_arbitro && <div className="text-danger">{errors.id_arbitro.message}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor='resultado' className="form-label">Resultado</label>
          <input
            type='text'
            id='resultado'
            className="form-control"
            {...register("resultado", { required: 'El resultado es requerido' })}
          />
          {errors.resultado && <div className="text-danger">{errors.resultado.message}</div>}
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Registrar
          </button>
          <button type="button" className="btn btn-secondary mx-2" onClick={props.activarConsulta}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}
