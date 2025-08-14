import React from 'react';
import { useForm } from 'react-hook-form';

function Actualizar({ ciudad, onGuardarActualizacion, onVolver }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    React.useEffect(() => {
        setValue('nombre', ciudad.nombre);
    }, [ciudad, setValue]);

    const onSubmit = async (data) => {
        onGuardarActualizacion(data);
    };

    return (
        <div className="container col-7 card mt-3 p-3">
            <h4 className="mt-2 mb-3">Modificar Ciudad</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre de la Ciudad:</label>
                    <input
                        id="nombre"
                        type="text"
                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                        {...register('nombre', { required: 'El nombre de la ciudad es obligatorio' })}
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
                </div>
                <div className="d-flex">
                    <button type="submit" className="btn btn-primary me-2">Guardar</button>
                    <button type="button" className="btn btn-secondary" onClick={onVolver}>Volver</button>
                </div>
            </form>
        </div>
    );
}

export default Actualizar;
