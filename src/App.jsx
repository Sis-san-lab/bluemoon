import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";

import Galeria from "./pages/Galeria";
import Cartas from "./pages/Cartas";
import Musica from "./pages/Musica";
import Viajes from "./pages/Viajes";
import SobreNosotros from "./pages/SobreNosotros";
import LineaTemporal from "./pages/LineaTemporal";

function App() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [intentos, setIntentos] = useState(0);
  const [logueado, setLogueado] = useState(false);

  const [modoEdicion, setModoEdicion] = useState(false);

  const validarLogin = () => {
    if (
      usuario === "LunaAzul" &&
      password === "25052012"
    ) {
      setMensaje("🌙 Bienvenida a BlueMoon");
      setLogueado(true);
    } else {
      setIntentos((prev) => prev + 1);

      if (intentos >= 4) {
        setMensaje("💙 No busques una palabra. Buscá un día.");
      } else if (intentos >= 2) {
        setMensaje("🌙 La respuesta está en el comienzo de algo hermoso.");
      } else {
        setMensaje("✨ Esa estrella no pertenece a esta constelación.");
      }
    }
  };

  if (!logueado) {
    return (
      <Login
        usuario={usuario}
        setUsuario={setUsuario}
        password={password}
        setPassword={setPassword}
        mensaje={mensaje}
        intentos={intentos}
        validarLogin={validarLogin}
      />
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            modoEdicion={modoEdicion}
            setModoEdicion={setModoEdicion}
          />
        }
      />

      <Route
        path="/galeria"
        element={<Galeria modoEdicion={modoEdicion} />}
      />

      <Route
        path="/cartas"
        element={<Cartas modoEdicion={modoEdicion} />}
      />

      <Route
        path="/musica"
        element={<Musica modoEdicion={modoEdicion} />}
      />

      <Route
        path="/viajes"
        element={<Viajes modoEdicion={modoEdicion} />}
      />

      <Route
        path="/sobre-nosotros"
        element={<SobreNosotros modoEdicion={modoEdicion} />}
      />

      <Route
        path="/linea-temporal"
        element={<LineaTemporal modoEdicion={modoEdicion} />}
      />
    </Routes>
  );
}

export default App;