import { useForm } from 'react-hook-form';

export default function TorneosRegistro(props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div className="container col-7 card mt-3 p-3">
            <h4 className="mt-2 mb-3">Registrar Torneo</h4>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <div className="mb-2">
                    <label htmlFor="nombre_torneo" className="form-label">
                        Nombre del Torneo:
                    </label>
                    <input
                        type="text"
                        id="nombre_torneo"
                        className="form-control"
                        {...register('nombre_torneo', {
                            required: 'Ingrese el nombre del torneo'
                        })}
                    />
                    {errors.nombre_torneo && (
                        <div className="text-danger">
                            {errors.nombre_torneo.message}
                        </div>
                    )}
                </div>

                <div className="mb-4">
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

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                        Registrar
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary mx-2"
                        onClick={props.activarConsulta}
                    >
                        Volver
                    </button>
                </div>
            </form>
        </div>
    );
}
