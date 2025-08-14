import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Menu } from './components/Menu';
import Equipos from './components/equipos/Equipos.jsx';
import Jugadores from './components/jugadores/Jugadores.jsx';
import Partidos from './components/partidos/Partidos.jsx';
import Estadios from './components/estadios/Estadios.jsx';
import Torneos from './components/torneos/Torneos.jsx';
import Entrenadores from './components/entrenadores/Entrenadores.jsx';
import Arbitros from './components/arbitros/Arbitros.jsx';
import Ciudades from './components/ciudades/Ciudades.jsx';
import Inicio from './components/Inicio.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/jugadores" element={<Jugadores />} />
            <Route path="/partidos" element={<Partidos />} />
            <Route path="/estadios" element={<Estadios />} />
            <Route path="/torneos" element={<Torneos />} />
            <Route path="/entrenadores" element={<Entrenadores />} />
            <Route path="/arbitros" element={<Arbitros />} />
            <Route path="/ciudades" element={<Ciudades />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
