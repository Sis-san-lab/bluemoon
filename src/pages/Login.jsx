import Moon from "../components/Moon";
import Stars from "../components/Stars";

function Login({
  usuario,
  setUsuario,
  password,
  setPassword,
  mensaje,
  intentos,
  validarLogin,
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0B1026",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stars />

      {/* Luna de fondo */}
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          opacity: 0.25,
          transform: "scale(2.5)",
        }}
      >
        <Moon />
      </div>

      {/* Contenido */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            marginBottom: "35px",
          }}
        >
          BlueMoon
        </h1>

        <input
          type="text"
          placeholder="Tu nombre de IG 🌙"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Fecha de nuestro primer beso 💙"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginTop: "15px",
          }}
        />

        <button
          onClick={validarLogin}
          style={{
            marginTop: "25px",
          }}
        >
          Entrar
        </button>

        {mensaje && (
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            {mensaje}
          </p>
        )}

        <p
          style={{
            marginTop: "10px",
            fontSize: "0.9rem",
            opacity: 0.7,
          }}
        >
          Intentos: {intentos}
        </p>
      </div>
    </div>
  );
}

export default Login;