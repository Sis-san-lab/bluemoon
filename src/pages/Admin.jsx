import { useNavigate } from "react-router-dom";
import Stars from "../components/Stars";

function Admin() {
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

      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "40px",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            marginBottom: "30px",
          }}
        >
          🌙 Volver al universo
        </button>

        <h1>⚙️ Panel BlueMoon</h1>

        <p>
          Desde aquí ustedes podrán seguir construyendo su historia juntos.
        </p>

        <div
          style={{
            marginTop: "50px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            maxWidth: "900px",
          }}
        >
          <button
            onClick={() => navigate("/sobre-nosotros")}
            style={{
              height: "100px",
              fontSize: "1.2rem",
            }}
          >
            ❤️ Sobre Nosotros
          </button>

          <button
            onClick={() => navigate("/galeria")}
            style={{
              height: "100px",
              fontSize: "1.2rem",
            }}
          >
            📸 Galería
          </button>

          <button
            onClick={() => navigate("/linea-temporal")}
            style={{
              height: "100px",
              fontSize: "1.2rem",
            }}
          >
            🗓️ Línea Temporal
          </button>

          <button
            onClick={() => navigate("/cartas")}
            style={{
              height: "100px",
              fontSize: "1.2rem",
            }}
          >
            💌 Cartas
          </button>

          <button
            onClick={() => navigate("/musica")}
            style={{
              height: "100px",
              fontSize: "1.2rem",
            }}
          >
            🎵 Música
          </button>

          <button
            onClick={() => navigate("/viajes")}
            style={{
              height: "100px",
              fontSize: "1.2rem",
            }}
          >
            ✈️ Viajes
          </button>
        </div>

        <div
          style={{
            marginTop: "50px",
            opacity: 0.7,
          }}
        >
          <h3>🌙 Próximamente</h3>

          <p>
            👨‍👩‍👧‍👦 Familia
          </p>

          <p>
            🤖 BlueMoon AI
          </p>
        </div>
      </div>
    </div>
  );
}

export default Admin;