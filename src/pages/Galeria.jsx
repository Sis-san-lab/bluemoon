import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stars from "../components/Stars";
import { API_URL } from "../config";

function Galeria({ modoEdicion }) {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [fotos, setFotos] = useState([]);

  const [fotoActual, setFotoActual] = useState(null);

  const [editandoId, setEditandoId] = useState(null);
  const [tituloEditado, setTituloEditado] = useState("");
  const [descripcionEditada, setDescripcionEditada] =
    useState("");

  const cargarFotos = async () => {
    try {
      const res = await fetch("https://translation-rats-winning-academics.trycloudflare.com/fotos");
      const data = await res.json();
      setFotos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarFotos();
  }, []);

  const subirFoto = async () => {
    if (!imagen) {
      alert("Seleccioná una imagen");
      return;
    }

    const formData = new FormData();

    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("imagen", imagen);

    try {
      await fetch("https://translation-rats-winning-academics.trycloudflare.com/fotos", {
        method: "POST",
        body: formData,
      });

      setTitulo("");
      setDescripcion("");
      setImagen(null);

      cargarFotos();

      alert("📸 Foto guardada");
    } catch (error) {
      console.error(error);
      alert("Error al guardar");
    }
  };

  const eliminarFoto = async (id) => {
  const confirmar = window.confirm(
    "¿Eliminar esta foto?"
  );

  if (!confirmar) return;

  try {
    await fetch(
  `${API_URL}/fotos/${id}`,
  {
    method: "DELETE",
  }
);

    cargarFotos();

    if (
      fotoActual &&
      fotoActual.id === id
    ) {
      setFotoActual(null);
    }

    alert("🗑️ Foto eliminada");
  } catch (error) {
    console.error(error);
  }
};

const iniciarEdicion = (foto) => {
  setEditandoId(foto.id);
  setTituloEditado(foto.titulo);
  setDescripcionEditada(foto.descripcion);
};

const guardarEdicion = async (id) => {
  try {
    await fetch(
      `${API_URL}/fotos/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          titulo: tituloEditado,
          descripcion:
            descripcionEditada,
        }),
      }
    );

    setEditandoId(null);

    cargarFotos();

    alert("📸 Foto actualizada");
  } catch (error) {
    console.error(error);
  }
};

  const fotoAnterior = () => {
    const indice = fotos.findIndex(
      (f) => f.id === fotoActual.id
    );

    const anterior =
      indice === 0
        ? fotos[fotos.length - 1]
        : fotos[indice - 1];

    setFotoActual(anterior);
  };

  const fotoSiguiente = () => {
    const indice = fotos.findIndex(
      (f) => f.id === fotoActual.id
    );

    const siguiente =
      indice === fotos.length - 1
        ? fotos[0]
        : fotos[indice + 1];

    setFotoActual(siguiente);
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
          maxWidth: "1200px",
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

        <h1>📸 Galería</h1>

        <p>
          Aquí vivirán nuestros viajes, momentos y recuerdos.
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
            <h3>➕ Agregar Foto</h3>

            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                marginTop: "15px",
                padding: "10px",
              }}
            />

            <textarea
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                marginTop: "15px",
                padding: "10px",
                minHeight: "100px",
              }}
            />

            <input
              type="file"
              onChange={(e) => setImagen(e.target.files[0])}
              style={{
                marginTop: "15px",
              }}
            />

            <button
              onClick={subirFoto}
              style={{
                marginTop: "20px",
              }}
            >
              📸 Guardar Foto
            </button>
          </div>
        )}

        <div
          style={{
            marginTop: "50px",
          }}
        >
          <h2>🖼️ Recuerdos</h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "25px",
            }}
          >
            {fotos.map((foto) => (
              <div
                key={foto.id}
                style={{
                  width: "250px",
                }}
              >
                <img
                  src={`${API_URL}/uploads/${foto.archivo}`}
                  alt={foto.titulo}
                  onClick={() => setFotoActual(foto)}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                />

                {editandoId === foto.id ? (
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
        padding: "8px",
        marginTop: "10px",
      }}
    />

    <textarea
      value={descripcionEditada}
      onChange={(e) =>
        setDescripcionEditada(
          e.target.value
        )
      }
      style={{
        width: "100%",
        padding: "8px",
        marginTop: "10px",
      }}
    />

    <button
      onClick={() =>
        guardarEdicion(foto.id)
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
    <h3>{foto.titulo}</h3>

    <p
      style={{
        opacity: 0.8,
      }}
    >
      {foto.descripcion}
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
            iniciarEdicion(foto)
          }
        >
          ✏️ Editar
        </button>

        <button
          onClick={() =>
            eliminarFoto(foto.id)
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
          </div>

          {fotos.length === 0 && (
            <p
              style={{
                marginTop: "20px",
                opacity: 0.7,
              }}
            >
              Aún no hay fotos cargadas.
            </p>
          )}
        </div>
      </div>

      {fotoActual && (
        <div
          onClick={() => setFotoActual(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              fotoAnterior();
            }}
            style={{
              position: "absolute",
              left: "30px",
              fontSize: "3rem",
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            ←
          </button>

          <img
            src={`${API_URL}/uploads/${fotoActual.archivo}`}
            alt={fotoActual.titulo}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90%",
              maxHeight: "85%",
              borderRadius: "15px",
            }}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              fotoSiguiente();
            }}
            style={{
              position: "absolute",
              right: "30px",
              fontSize: "3rem",
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            →
          </button>

          <button
            onClick={() => setFotoActual(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              fontSize: "2rem",
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default Galeria;


