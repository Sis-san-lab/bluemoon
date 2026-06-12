import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stars from "../components/Stars";
import { API_URL } from "../config";

function Musica({ modoEdicion }) {
  const navigate = useNavigate();

  const [link, setLink] = useState("");
  const [artista, setArtista] = useState("");

  const [playlist, setPlaylist] = useState({});
  const [artistas, setArtistas] = useState([]);

  const cargarPlaylist = async () => {
    const res = await fetch(
      `${API_URL}/playlist`
    );

    const data = await res.json();

    setPlaylist(data);
  };

  const cargarArtistas = async () => {
    const res = await fetch(
      `${API_URL}/artistas`
    );

    const data = await res.json();

    setArtistas(data);
  };

  useEffect(() => {
    cargarPlaylist();
    cargarArtistas();
  }, []);

  const guardarPlaylist = async () => {
    await fetch(
      `${API_URL}/playlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link,
        }),
      }
    );

    setLink("");

    cargarPlaylist();

    alert("🎵 Playlist actualizada");
  };

  const agregarArtista = async () => {
    await fetch(
      `${API_URL}/artistas`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: artista,
        }),
      }
    );

    setArtista("");

    cargarArtistas();

    alert("🎤 Artista agregado");
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
          maxWidth: "1000px",
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

        <h1>🎵 Música</h1>

        <p>
          Nuestra banda sonora.
        </p>

        {modoEdicion && (
          <>
            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "12px",
              }}
            >
              <h3>🎵 Playlist</h3>

              <input
                type="text"
                placeholder="Link de YouTube Music"
                value={link}
                onChange={(e) =>
                  setLink(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                }}
              />

              <button
                onClick={guardarPlaylist}
                style={{
                  marginTop: "15px",
                }}
              >
                Guardar Playlist
              </button>
            </div>

            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "12px",
              }}
            >
              <h3>🎤 Agregar Artista</h3>

              <input
                type="text"
                placeholder="Nombre del artista"
                value={artista}
                onChange={(e) =>
                  setArtista(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "10px",
                }}
              />

              <button
                onClick={agregarArtista}
                style={{
                  marginTop: "15px",
                }}
              >
                Agregar
              </button>
            </div>
          </>
        )}

        <div
          style={{
            marginTop: "50px",
          }}
        >
          <h2>🎵 Nuestra Playlist</h2>

          {playlist?.link && (
            <button
              onClick={() =>
                window.open(
                  playlist.link,
                  "_blank"
                )
              }
              style={{
                marginTop: "20px",
              }}
            >
              ▶️ Abrir Playlist
            </button>
          )}

          <h2
            style={{
              marginTop: "50px",
            }}
          >
            🎤 Artistas que nos acompañan
          </h2>

          <div
            style={{
              marginTop: "20px",
            }}
          >
            {artistas.map((artista) => (
              <p key={artista.id}>
                🎵 {artista.nombre}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Musica;