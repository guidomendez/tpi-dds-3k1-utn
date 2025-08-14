import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <>
      <nav className="navbar navbar-dark bg-gray-dark navbar-expand-md">
        <div className="container-fluid">
          <a className="navbar-brand p-2" href="/inicio">
            <i className="fa fa-home me-2"></i>
            &nbsp;<i></i>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav-tabs navbar-nav m-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/Arbitros">
                  Arbitros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Ciudades">
                  Ciudades
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Entrenadores">
                  Entrenadores
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/equipos">
                  Equipos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/estadios">
                  Estadios
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/jugadores">
                  Jugadores
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Partidos">
                  Partidos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Torneos">
                  Torneos
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export { Menu };
