import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function JugadoresActualizar({ equipos, jugador, onGuardarActualizacion, onVolver }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        setValue('nombre_jugador', jugador.nombre_jugador);
        setValue('fecha_nacimiento', jugador.fecha_nacimiento);
        setValue('posicion', jugador.posicion);
        setValue('id_equipo', jugador.id_equipo);
    }, [jugador, setValue]);

    const onSubmit = async (data) => {
        onGuardarActualizacion(data);
    };

    return (
        <div className="container col-7 card mt-3 p-3">
            <h4 className="mt-2 mb-3">Modificar Jugador</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="nombre_jugador" className="form-label">
                        Nombre del Jugador:
                    </label>
                    <input
                        type="text"
                        id="nombre_jugador"
                        className="form-control"
                        {...register("nombre_jugador", { required: "Nombre del jugador es requerido" })}
                    />
                    {errors.nombre_jugador && (
                        <div className="text-danger">{errors.nombre_jugador.message}</div>
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
                        {...register("fecha_nacimiento", { required: "Fecha de nacimiento es requerida" })}
                    />
                    {errors.fecha_nacimiento && (
                        <div className="text-danger">{errors.fecha_nacimiento.message}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="posicion" className="form-label">
                        Posición:
                    </label>
                    <input
                        type="text"
                        id="posicion"
                        className="form-control"
                        {...register("posicion", { required: "Posición es requerida" })}
                    />
                    {errors.posicion && (
                        <div className="text-danger">{errors.posicion.message}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="id_equipo" className="form-label">
                        Equipo:
                    </label>
                    <select
                        id="id_equipo"
                        className="form-control"
                        defaultValue=""
                        {...register("id_equipo", { required: "Este campo es requerido" })}
                    >
                        <option value="" disabled>Seleccione un equipo</option>
                        {Array.isArray(equipos) && equipos.map((e) => (
                            <option key={e.id_equipo} value={e.id_equipo}>
                                {e.nombre_equipo}
                            </option>
                        ))}
                    </select>
                    {errors.id_equipo && (
                        <div className="text-danger">{errors.id_equipo.message}</div>
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
    );
}
