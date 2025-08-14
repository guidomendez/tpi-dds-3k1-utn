import React from "react";
import { useForm } from 'react-hook-form';

export default function TorneosActualizar({
    torneo,
    onGuardarActualizacion,
    onVolver
}) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    React.useEffect(() => {
        setValue("nombre_torneo", torneo.nombre_torneo);
        setValue("año", torneo.año);
    }, [torneo, setValue]);

    const onSubmit = async (data) => {
        onGuardarActualizacion(data);
    };

    return (
        <div className="container col-7 card mt-3 p-3">
            <h4 className="mt-2 mb-3">Modificar Torneo</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="nombre_torneo" className="form-label">
                        Nombre del Torneo:
                    </label>
                    <input
                        type="text"
                        id="nombre_torneo"
                        className="form-control"
                        {...register("nombre_torneo", {
                            required: "Este campo es requerido",
                        })}
                    />
                    {errors.nombre_torneo && (
                        <div className="text-danger">
                            {errors.nombre_torneo.message}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor='año' className="form-label">Ingrese el año del torneo</label>
                    <input 
                        type='int'
                        id="año"
                        className="form-control"
                        {...register('año', { required: true, min: 1000, max: new Date().getFullYear() })}
                    />
                    {errors.año && errors.año.type === 'required' && <span className="text-danger">El año es requerido</span>}
                    {errors.año && errors.año.type === 'min' && <span className="text-danger">El año debe ser igual o mayor a 1000</span>}
                    {errors.año && errors.año.type === 'max' && <span className="text-danger">El año no puede ser mayor al año actual</span>}
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
