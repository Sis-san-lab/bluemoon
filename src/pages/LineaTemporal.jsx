import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stars from "../components/Stars";
import { API_URL } from "../config";

function LineaTemporal({ modoEdicion }) {
  const navigate = useNavigate();

  const [fecha, setFecha] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [eventos, setEventos] = useState([]);

  const [editandoId, setEditandoId] = useState(null);

  const [fechaEditada, setFechaEditada] =
    useState("");

  const [tituloEditado, setTituloEditado] =
    useState("");

  const [
    descripcionEditada,
    setDescripcionEditada,
  ] = useState("");

  const cargarEventos = async () => {
    try {
      const res = await fetch(
        `${API_URL}/linea-temporal`,

      );

      const data = await res.json();

      setEventos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const guardarEvento = async () => {
    if (!fecha || !titulo) {
      alert("Completá fecha y título");
      return;
    }

    try {
      await fetch(
        `${API_URL}/linea-temporal`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            fecha,
            titulo,
            descripcion,
          }),
        }
      );

      setFecha("");
      setTitulo("");
      setDescripcion("");

      cargarEventos();

      alert("📅 Evento guardado");
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarEvento = async (id) => {
    const confirmar = window.confirm(
      "¿Eliminar este evento?"
    );

    if (!confirmar) return;

    try {
        await fetch(
          `${API_URL}/linea-temporal/${id}`,
        {
          method: "DELETE",
        }
      );

      cargarEventos();

      alert("🗑️ Evento eliminado");
    } catch (error) {
      console.error(error);
    }
  };

  const iniciarEdicion = (evento) => {
    setEditandoId(evento.id);

    setFechaEditada(
      evento.fecha?.split("T")[0] ||
        evento.fecha
    );

    setTituloEditado(evento.titulo);

    setDescripcionEditada(
      evento.descripcion || ""
    );
  };

  const guardarEdicion = async (id) => {
    try {
      await fetch(
        `${API_URL}/linea-temporal/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            fecha: fechaEditada,
            titulo: tituloEditado,
            descripcion:
              descripcionEditada,
          }),
        }
      );

      setEditandoId(null);

      cargarEventos();

      alert("📅 Evento actualizado");
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

        <h1>📅 Línea Temporal</h1>

        <p>
          Los momentos que marcaron nuestra
          historia.
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
            <h3>➕ Nuevo Evento</h3>

            <input
              type="date"
              value={fecha}
              onChange={(e) =>
                setFecha(e.target.value)
              }
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginTop: "15px",
              }}
            />

            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) =>
                setTitulo(e.target.value)
              }
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginTop: "15px",
              }}
            />

            <textarea
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) =>
                setDescripcion(
                  e.target.value
                )
              }
              style={{
                display: "block",
                width: "100%",
                minHeight: "100px",
                padding: "10px",
                marginTop: "15px",
              }}
            />

            <button
              onClick={guardarEvento}
              style={{
                marginTop: "20px",
              }}
            >
              📅 Guardar Evento
            </button>
          </div>
        )}

        <div
          style={{
            marginTop: "50px",
          }}
        >
          <h2>🌙 Nuestra Historia</h2>

          {eventos.map((evento) => (
            <div
              key={evento.id}
              style={{
                marginTop: "30px",
                paddingLeft: "25px",
                borderLeft:
                  "2px solid rgba(255,255,255,0.3)",
              }}
            >
              {editandoId === evento.id ? (
                <>
                  <input
                    type="date"
                    value={fechaEditada}
                    onChange={(e) =>
                      setFechaEditada(
                        e.target.value
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                    }}
                  />

                  <input
                    type="text"
                    value={tituloEditado}
                    onChange={(e) =>
                      setTituloEditado(
                        e.target.value
                      )
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "10px",
                    }}
                  />

                  <textarea
                    value={
                      descripcionEditada
                    }
                    onChange={(e) =>
                      setDescripcionEditada(
                        e.target.value
                      )
                    }
                    style={{
                      width: "100%",
                      minHeight: "100px",
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  />

                  <button
                    onClick={() =>
                      guardarEdicion(
                        evento.id
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
                    style={{
                      fontSize: "0.9rem",
                      opacity: 0.7,
                    }}
                  >
                    {new Date(
                      evento.fecha
                    ).toLocaleDateString(
                      "es-AR"
                    )}
                  </div>

                  <h3
                    style={{
                      marginTop: "8px",
                    }}
                  >
                    🌙 {evento.titulo}
                  </h3>

                  <p
                    style={{
                      opacity: 0.85,
                    }}
                  >
                    {evento.descripcion}
                  </p>

                  {modoEdicion && (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <button
                        onClick={() =>
                          iniciarEdicion(
                            evento
                          )
                        }
                      >
                        ✏️ Editar
                      </button>

                      <button
                        onClick={() =>
                          eliminarEvento(
                            evento.id
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

          {eventos.length === 0 && (
            <p
              style={{
                marginTop: "20px",
                opacity: 0.7,
              }}
            >
              Aún no hay recuerdos cargados.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LineaTemporal;