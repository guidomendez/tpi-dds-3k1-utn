import React from "react";
import { useForm } from "react-hook-form";

export default function PartidosActualizar({
    partido,
    onGuardarActualizacion,
    onVolver,
    estadios,
    torneos,
    equipoLocal,
    equipoVisitante,
    arbitros,
}) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    React.useEffect(() => {
        setValue("fecha", partido.fecha);
        setValue("id_estadio", partido.id_estadio);
        setValue("id_torneo", partido.id_torneo);
        setValue("id_equipo_local", partido.id_equipo_local);
        setValue("id_equipo_visitante", partido.id_equipo_visitante);
        setValue("id_arbitro", partido.id_arbitro);
        setValue("resultado", partido.resultado);
    }, [partido, setValue]);

    const onSubmit = async (data) => {
        onGuardarActualizacion(data);
    };

    return (
        <div className="container col-7 card mt-3 p-3">
            <h4 className="mt-2 mb-3">Actualizar Partido</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">
                        Fecha del Partido:
                    </label>
                    <input
                        type="date"
                        id="fecha"
                        className="form-control"
                        {...register("fecha", {
                            required: "La fecha es requerida",
                        })}
                    />
                    {errors.fecha && (
                        <div className="text-danger">{errors.fecha.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="id_estadio" className="form-label">
                        Estadio:
                    </label>
                    <select
                        id="id_estadio"
                        className="form-control"
                        defaultValue=""
                        {...register("id_estadio", {
                            required: "El estadio es requerido",
                        })}
                    >
                        <option value="" disabled>Seleccione un estadio</option>
                        {estadios.map((e) => (
                            <option key={e.id_estadio} value={e.id_estadio}>
                                {e.nombre_estadio}
                            </option>
                        ))}
                    </select>
                    {errors.id_estadio && (
                        <div className="text-danger">{errors.id_estadio.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="id_torneo" className="form-label">
                        Torneo:
                    </label>
                    <select
                        id="id_torneo"
                        className="form-control"
                        defaultValue=""
                        {...register("id_torneo", {
                            required: "El torneo es requerido",
                        })}
                    >
                        <option value="" disabled>Seleccione un torneo</option>
                        {torneos.map((e) => (
                            <option key={e.id_torneo} value={e.id_torneo}>
                                {e.nombre_torneo}
                            </option>
                        ))}
                    </select>
                    {errors.id_torneo && (
                        <div className="text-danger">{errors.id_torneo.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="id_equipo_local" className="form-label">
                        Equipo Local:
                    </label>
                    <select
                        id="id_equipo_local"
                        className="form-control"
                        defaultValue=""
                        {...register("id_equipo_local", {
                            required: "El equipo local es requerido",
                        })}
                    >
                        <option value="" disabled>Seleccione un equipo local</option>
                        {equipoLocal.map((e) => (
                            <option key={e.id_equipo} value={e.id_equipo}>
                                {e.nombre_equipo}
                            </option>
                        ))}
                    </select>
                    {errors.id_equipo_local && (
                        <div className="text-danger">{errors.id_equipo_local.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="id_equipo_visitante" className="form-label">
                        Equipo Visitante:
                    </label>
                    <select
                        id="id_equipo_visitante"
                        className="form-control"
                        defaultValue=""
                        {...register("id_equipo_visitante", {
                            required: "El equipo visitante es requerido",
                        })}
                    >
                        <option value="" disabled>Seleccione un equipo visitante</option>
                        {equipoVisitante.map((e) => (
                            <option key={e.id_equipo} value={e.id_equipo}>
                                {e.nombre_equipo}
                            </option>
                        ))}
                    </select>
                    {errors.id_equipo_visitante && (
                        <div className="text-danger">{errors.id_equipo_visitante.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="id_arbitro" className="form-label">
                        Árbitro:
                    </label>
                    <select
                        id="id_arbitro"
                        className="form-control"
                        defaultValue=""
                        {...register("id_arbitro", {
                            required: "El árbitro es requerido",
                        })}
                    >
                        <option value="" disabled>Seleccione un árbitro</option>
                        {arbitros.map((e) => (
                            <option key={e.id_arbitro} value={e.id_arbitro}>
                                {e.nombre_arbitro}
                            </option>
                        ))}
                    </select>
                    {errors.id_arbitro && (
                        <div className="text-danger">{errors.id_arbitro.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="resultado" className="form-label">
                        Resultado:
                    </label>
                    <input
                        type="text"
                        id="resultado"
                        className="form-control"
                        {...register("resultado", {
                            required: "El resultado es requerido",
                        })}
                    />
                    {errors.resultado && (
                        <div className="text-danger">{errors.resultado.message}</div>
                    )}
                </div>

                <div className="d-flex">
                    <button type="submit" className="btn btn-primary me-2">
                        Guardar
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onVolver}>
                        Volver
                    </button>
                </div>
            </form>
        </div>
    );
}
