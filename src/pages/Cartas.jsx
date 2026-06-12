import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stars from "../components/Stars";
import { API_URL } from "../config";


function Cartas({ modoEdicion }) {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  const [cartas, setCartas] = useState([]);

  const [cartaAbierta, setCartaAbierta] =
    useState(null);

  const [editandoId, setEditandoId] =
    useState(null);

  const [tituloEditado, setTituloEditado] =
    useState("");

  const [
    contenidoEditado,
    setContenidoEditado,
  ] = useState("");

  const cargarCartas = async () => {
    try {
      const res = await fetch(
        `${API_URL}/cartas`
      );

      const data = await res.json();

      setCartas(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarCartas();
  }, []);

  const guardarCarta = async () => {
    if (!titulo || !contenido) {
      alert("Completá título y carta");
      return;
    }

    try {
      await fetch(
        `${API_URL}/cartas`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            titulo,
            contenido,
          }),
        }
      );

      setTitulo("");
      setContenido("");

      cargarCartas();

      alert("💌 Carta guardada");
    } catch (error) {
      console.error(error);
      alert("Error al guardar");
    }
  };

  const eliminarCarta = async (id) => {
    const confirmar = window.confirm(
      "¿Eliminar esta carta?"
    );

    if (!confirmar) return;

    try {
      await fetch(
        `${API_URL}/cartas/${id}`,
        {
          method: "DELETE",
        }
      );

      if (
        cartaAbierta &&
        cartaAbierta.id === id
      ) {
        setCartaAbierta(null);
      }

      cargarCartas();

      alert("🗑️ Carta eliminada");
    } catch (error) {
      console.error(error);
    }
  };

  const iniciarEdicion = (carta) => {
    setEditandoId(carta.id);

    setTituloEditado(carta.titulo);

    setContenidoEditado(
      carta.contenido
    );
  };

  const guardarEdicion = async (id) => {
    try {
      await fetch(
        `${API_URL}/cartas/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            titulo: tituloEditado,
            contenido:
              contenidoEditado,
          }),
        }
      );

      setEditandoId(null);

      cargarCartas();

      alert("💌 Carta actualizada");
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

        <h1>💌 Cartas</h1>

        <p>
          Aquí todo lo que nos queramos
          decir.
        </p>

        {modoEdicion && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              border:
                "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
            }}
          >
            <h3>➕ Nueva Carta</h3>

            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) =>
                setTitulo(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "15px",
              }}
            />

            <textarea
              placeholder="Escribí tu carta..."
              value={contenido}
              onChange={(e) =>
                setContenido(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                minHeight: "250px",
                padding: "10px",
                marginTop: "15px",
              }}
            />

            <button
              onClick={guardarCarta}
              style={{
                marginTop: "20px",
              }}
            >
              💌 Guardar Carta
            </button>
          </div>
        )}

        <div
          style={{
            marginTop: "50px",
          }}
        >
          <h2>📜 Nuestras Cartas</h2>

          {cartas.map((carta) => (
            <div
              key={carta.id}
              style={{
                marginTop: "20px",
                padding: "20px",
                border:
                  "1px solid rgba(255,255,255,0.2)",
                borderRadius: "12px",
              }}
            >
              {editandoId === carta.id ? (
                <>
                  <input
                    value={tituloEditado}
                    onChange={(e) =>
                      setTituloEditado(
                        e.target.value
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                    }}
                  />

                  <textarea
                    value={
                      contenidoEditado
                    }
                    onChange={(e) =>
                      setContenidoEditado(
                        e.target.value
                      )
                    }
                    style={{
                      width: "100%",
                      minHeight: "200px",
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  />

                  <button
                    onClick={() =>
                      guardarEdicion(
                        carta.id
                      )
                    }
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    💾 Guardar
                  </button>
                </>
              ) : (
                <>
                  <div
                    onClick={() =>
                      setCartaAbierta(
                        carta
                      )
                    }
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <h3>
                      💌 {carta.titulo}
                    </h3>

                    <p
                      style={{
                        opacity: 0.7,
                        fontSize:
                          "0.9rem",
                      }}
                    >
                      {new Date(
                        carta.fecha
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  {modoEdicion && (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "15px",
                      }}
                    >
                      <button
                        onClick={() =>
                          iniciarEdicion(
                            carta
                          )
                        }
                      >
                        ✏️ Editar
                      </button>

                      <button
                        onClick={() =>
                          eliminarCarta(
                            carta.id
                          )
                        }
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          {cartas.length === 0 && (
            <p
              style={{
                marginTop: "20px",
                opacity: 0.7,
              }}
            >
              Aún no hay cartas escritas.
            </p>
          )}
        </div>
      </div>

      {cartaAbierta && (
        <div
          onClick={() =>
            setCartaAbierta(null)
          }
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.95)",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "30px",
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              background: "#11183A",
              padding: "40px",
              borderRadius: "15px",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <h2>
              💌 {cartaAbierta.titulo}
            </h2>

            <p
              style={{
                opacity: 0.7,
                marginBottom: "25px",
              }}
            >
              {new Date(
                cartaAbierta.fecha
              ).toLocaleDateString()}
            </p>

            <p
              style={{
                whiteSpace:
                  "pre-wrap",
                lineHeight: "1.8",
              }}
            >
              {cartaAbierta.contenido}
            </p>

            <button
              onClick={() =>
                setCartaAbierta(null)
              }
              style={{
                marginTop: "30px",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cartas;