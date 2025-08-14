import React, { useState } from "react";
import Actualizar from "./TorneosActualizar";
import servicios from "../../services/torneos.services";
import "bootstrap/dist/css/bootstrap.css";

export default function TorneosListado({
    data,
    onDelete,
    activarRegistro,
    handleSearch,
    nombre,
    setFiltroNombreTorneo,
    loadData,
}) {
    const [action, setAction] = useState("C");
    const [torneo, setTorneo] = useState([]);

    const onGuardarActualizacion = async (data) => {
        if (torneo) {
            await servicios.updateTorneo(torneo.id_torneo, data);
            setAction("C");
            loadData();
        }
    };

    const onVolver = () => {
        setAction("C");
    };

    const onActualizar = async (id_torneo) => {
        await loadId(id_torneo);
        setAction("A");
    };

    const loadId = async (id_torneo) => {
        const torneoData = await servicios.getTorneosById(id_torneo);
        setTorneo(torneoData);
    };

    const tbody = data.map((torneo) => (
        <tr key={torneo.id_torneo}>
            <td>{torneo.nombre_torneo}</td>
            <td>{torneo.año}</td>
            <td>
                <button
                    className="btn btn-primary"
                    onClick={() => onActualizar(torneo.id_torneo)}
                >
                    <i className="fa-solid fa-pen"></i>
                </button>
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(torneo.id_torneo)}
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    ));

    return (
        <>
            {action === "A" && torneo && (
                <Actualizar
                    torneo={torneo}
                    onGuardarActualizacion={onGuardarActualizacion}
                    onVolver={onVolver}
                />
            )}

            {action === "C" && (
                <div>
                    <div className="mt-4">
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control rounded-start"
                                    value={nombre}
                                    onChange={(e) => setFiltroNombreTorneo(e.target.value)}
                                    placeholder="Buscar por nombre"
                                />
                                <button
                                    className="btn btn-primary rounded-end ms-2"
                                    onClick={handleSearch}
                                >
                                    Filtrar
                                </button>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-success ms-4" onClick={activarRegistro}>
                                        Agregar torneo
                                    </button>
                                </div>
                            </div>
                            <div className="card mt-4">
                                <div className="card-body p-2"></div>
                                <table className="table table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Nombre del Torneo</th>
                                            <th scope="col">Año</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>{tbody}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div >
            )
            }
        </>
    );
}

export { TorneosListado };
