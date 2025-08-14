import { useForm } from "react-hook-form";

export default function EquiposRegistro(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="container col-7 card mt-3 p-3">
      <h4 className="mt-2 mb-3">Registrar Equipo</h4>
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <div className="mb-2">
          <label htmlFor="nombre_equipo" className="form-label">
            Nombre del Equipo:
          </label>
          <input
            type="text"
            id="nombre_equipo"
            className="form-control"
            {...register("nombre_equipo", {
              required: "Este campo es requerido",
            })}
          />
          {errors.nombre_equipo && (
            <div className="text-danger">
              {errors.nombre_equipo.message}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="abreviatura" className="form-label">
            Abreviatura:
          </label>
          <input
            type="text"
            id="abreviatura"
            className="form-control"
            {...register("abreviatura", {
              required: "Este campo es requerido",
            })}
          />
          {errors.abreviatura && (
            <div className="text-danger">
              {errors.abreviatura.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Confirmar
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
