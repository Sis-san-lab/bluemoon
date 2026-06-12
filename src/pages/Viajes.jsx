import { useNavigate } from "react-router-dom";
import Stars from "../components/Stars";

function Viajes({ modoEdicion }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0B1026",
        color: "white",
        position: "relative",
      }}
    >
      <Stars />

      <div
        style={{
          padding: "40px",
          position: "relative",
          zIndex: 10,
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

        <h1>✈️ Viajes</h1>

        <p>Acá viven nuestros mejores momentos.</p>

        {modoEdicion && (
          <div style={{ marginTop: "30px" }}>
            <button>➕ Nuevo Viaje</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Viajes;