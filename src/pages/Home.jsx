import { useNavigate } from "react-router-dom";
import Moon from "../components/Moon";
import Stars from "../components/Stars";

function Home({ modoEdicion, setModoEdicion }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0B1026",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stars />

      {/* Encabezado */}
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "40px",
          zIndex: 10,
        }}
      >
        <h2>🌙 Bienvenida, Flor</h2>

        <p>Este es el lugar donde guardé nuestra historia.</p>

        {modoEdicion && (
          <p
            style={{
              marginTop: "10px",
              color: "#9CC3FF",
              fontWeight: "bold",
            }}
          >
            🔐 Modo edición activado
          </p>
        )}
      </div>

      {/* Constelación */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Luna */}
        <div
          style={{
            position: "absolute",
          }}
        >
          <Moon
            onDoubleClick={() =>
              setModoEdicion(!modoEdicion)
            }
          />
        </div>

        {/* Galería */}
        <button
          onClick={() => navigate("/galeria")}
          style={{
            position: "absolute",
            top: "17%",
            left: "46%",
            transform: "translateX(-50%)",
            fontSize: "3rem",
            background: "transparent",
            border: "none",
            animation: "float 5s ease-in-out infinite",
          }}
        >
          📸
        </button>

        {/* Cartas */}
        <button
          onClick={() => navigate("/cartas")}
          style={{
            position: "absolute",
            left: "30%",
            top: "36%",
            fontSize: "3rem",
            background: "transparent",
            border: "none",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          💌
        </button>

        {/* Música */}
        <button
          onClick={() => navigate("/musica")}
          style={{
            position: "absolute",
            right: "30%",
            top: "36%",
            fontSize: "3rem",
            background: "transparent",
            border: "none",
            animation: "float 7s ease-in-out infinite",
          }}
        >
          🎵
        </button>

        {/* Sobre Nosotros */}
        <button
          onClick={() => navigate("/sobre-nosotros")}
          style={{
            position: "absolute",
            left: "30%",
            bottom: "30%",
            fontSize: "3rem",
            background: "transparent",
            border: "none",
            animation: "float 5s ease-in-out infinite",
          }}
        >
          ❤️
        </button>

        {/* Línea Temporal */}
        <button
          onClick={() => navigate("/linea-temporal")}
          style={{
            position: "absolute",
            right: "30%",
            bottom: "30%",
            fontSize: "3rem",
            background: "transparent",
            border: "none",
            animation: "float 6s ease-in-out infinite",
          }}
        >
          🗓️
        </button>

        {/* Viajes */}
        <button
          onClick={() => navigate("/viajes")}
          style={{
            position: "absolute",
            bottom: "15%",
            left: "46%",
            transform: "translateX(-50%)",
            fontSize: "3rem",
            background: "transparent",
            border: "none",
            animation: "float 8s ease-in-out infinite",
          }}
        >
          ✈️
        </button>
      </div>
    </div>
  );
}

export default Home;