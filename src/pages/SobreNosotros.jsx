import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stars from "../components/Stars";
import { API_URL } from "../config";

function SobreNosotros({ modoEdicion }) {
  const navigate = useNavigate();

  const [historia, setHistoria] = useState("");
  const [amoDeVos, setAmoDeVos] = useState("");
  const [frase, setFrase] = useState("");
  const [suenos, setSuenos] = useState("");

  const cargarDatos = async () => {
    try {
      const res = await fetch(
        `${API_URL}/sobre-nosotros`
      );

      const data = await res.json();

      setHistoria(data.historia || "");
      setAmoDeVos(data.amo_de_vos || "");
      setFrase(data.frase || "");
      setSuenos(data.suenos || "");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const guardarDatos = async () => {
    try {
      await fetch(
        `${API_URL}/sobre-nosotros`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            historia,
            amo_de_vos: amoDeVos,
            frase,
            suenos,
          }),
        }
      );

      alert("❤️ Información guardada");
    } catch (error) {
      console.error(error);
    }
  };

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
          maxWidth: "900px",
          margin: "0 auto",
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

        <h1>❤️ Sobre Nosotros</h1>

        <p>
          Un pequeño rincón donde vive nuestra historia.
        </p>

        {modoEdicion && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
            }}
          >
            <h3>✏️ Editar Historia</h3>

            <textarea
              placeholder="Cómo nos conocimos..."
              value={historia}
              onChange={(e) =>
                setHistoria(e.target.value)
              }
              style={{
                width: "100%",
                minHeight: "120px",
                marginTop: "15px",
                padding: "10px",
              }}
            />

            <textarea
              placeholder="Lo que más amo de vos..."
              value={amoDeVos}
              onChange={(e) =>
                setAmoDeVos(e.target.value)
              }
              style={{
                width: "100%",
                minHeight: "120px",
                marginTop: "15px",
                padding: "10px",
              }}
            />

            <textarea
              placeholder="Nuestra frase..."
              value={frase}
              onChange={(e) =>
                setFrase(e.target.value)
              }
              style={{
                width: "100%",
                minHeight: "80px",
                marginTop: "15px",
                padding: "10px",
              }}
            />

            <textarea
              placeholder="Nuestros sueños..."
              value={suenos}
              onChange={(e) =>
                setSuenos(e.target.value)
              }
              style={{
                width: "100%",
                minHeight: "120px",
                marginTop: "15px",
                padding: "10px",
              }}
            />

            <button
              onClick={guardarDatos}
              style={{
                marginTop: "20px",
              }}
            >
              ❤️ Guardar
            </button>
          </div>
        )}

        <div
          style={{
            marginTop: "50px",
          }}
        >
          <div
            style={{
              marginBottom: "40px",
            }}
          >
            <h2>🌙 Cómo nos conocimos</h2>
            <p>{historia || "Todavía no escrito."}</p>
          </div>

          <div
            style={{
              marginBottom: "40px",
            }}
          >
            <h2>💙 Lo que más amo de vos</h2>
            <p>{amoDeVos || "Todavía no escrito."}</p>
          </div>

          <div
            style={{
              marginBottom: "40px",
            }}
          >
            <h2>✨ Nuestra frase</h2>
            <p>{frase || "Todavía no escrita."}</p>
          </div>

          <div>
            <h2>🏡 Nuestros sueños</h2>
            <p>{suenos || "Todavía no escritos."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SobreNosotros;