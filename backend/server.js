import express from "express";
import cors from "cors";
import multer from "multer";
import conexion from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const nombre =
      Date.now() +
      "-" +
      file.originalname.replace(/\s+/g, "_");

    cb(null, nombre);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("🌙 BlueMoon Backend funcionando");
});

app.get("/fotos", (req, res) => {
  conexion.query(
    "SELECT * FROM galeria ORDER BY id DESC",
    (err, resultados) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(resultados);
    }
  );
});

app.post(
  "/fotos",
  upload.single("imagen"),
  (req, res) => {
    const { titulo, descripcion } = req.body;

    const archivo = req.file.filename;

    conexion.query(
      `
      INSERT INTO galeria
      (titulo, descripcion, archivo)
      VALUES (?, ?, ?)
      `,
      [titulo, descripcion, archivo],
      (err, resultado) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          mensaje: "Foto guardada",
        });
      }
    );
  }
);

app.put("/fotos/:id", (req, res) => {
  const { titulo, descripcion } = req.body;

  conexion.query(
    `
    UPDATE galeria
    SET titulo = ?, descripcion = ?
    WHERE id = ?
    `,
    [titulo, descripcion, req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "📸 Foto actualizada",
      });
    }
  );
});

app.delete("/fotos/:id", (req, res) => {
  conexion.query(
    "DELETE FROM galeria WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "🗑️ Foto eliminada",
      });
    }
  );
});

// =====================
// CARTAS
// =====================

app.get("/cartas", (req, res) => {
  conexion.query(
    "SELECT * FROM cartas ORDER BY fecha DESC",
    (err, resultados) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(resultados);
    }
  );
});

app.post("/cartas", (req, res) => {
  const { titulo, contenido } = req.body;

  conexion.query(
    `
    INSERT INTO cartas
    (titulo, contenido)
    VALUES (?, ?)
    `,
    [titulo, contenido],
    (err, resultado) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "💌 Carta guardada",
      });
    }
  );
});

app.put("/cartas/:id", (req, res) => {
  const { titulo, contenido } = req.body;

  conexion.query(
    `
    UPDATE cartas
    SET titulo = ?, contenido = ?
    WHERE id = ?
    `,
    [titulo, contenido, req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "💌 Carta actualizada",
      });
    }
  );
});

app.delete("/cartas/:id", (req, res) => {
  conexion.query(
    "DELETE FROM cartas WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "🗑️ Carta eliminada",
      });
    }
  );
});

// =====================
// PLAYLIST
// =====================

app.get("/playlist", (req, res) => {
  conexion.query(
    "SELECT * FROM playlist LIMIT 1",
    (err, resultados) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(resultados[0] || {});
    }
  );
});

app.post("/playlist", (req, res) => {
  const { link } = req.body;

  conexion.query(
    "SELECT * FROM playlist LIMIT 1",
    (err, resultados) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (resultados.length > 0) {
        conexion.query(
          "UPDATE playlist SET link = ? WHERE id = ?",
          [link, resultados[0].id],
          (err) => {
            if (err) {
              return res.status(500).json(err);
            }

            res.json({
              mensaje: "🎵 Playlist actualizada",
            });
          }
        );
      } else {
        conexion.query(
          "INSERT INTO playlist (link) VALUES (?)",
          [link],
          (err) => {
            if (err) {
              return res.status(500).json(err);
            }

            res.json({
              mensaje: "🎵 Playlist guardada",
            });
          }
        );
      }
    }
  );
});

// =====================
// ARTISTAS
// =====================

app.get("/artistas", (req, res) => {
  conexion.query(
    "SELECT * FROM artistas ORDER BY nombre",
    (err, resultados) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(resultados);
    }
  );
});

app.post("/artistas", (req, res) => {
  const { nombre } = req.body;

  conexion.query(
    "INSERT INTO artistas (nombre) VALUES (?)",
    [nombre],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "🎤 Artista agregado",
      });
    }
  );
});

// =====================
// LINEA TEMPORAL
// =====================

app.get("/linea-temporal", (req, res) => {
  conexion.query(
    "SELECT * FROM linea_temporal ORDER BY fecha ASC",
    (err, resultados) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(resultados);
    }
  );
});

app.post("/linea-temporal", (req, res) => {
  const { fecha, titulo, descripcion } = req.body;

  conexion.query(
    `
    INSERT INTO linea_temporal
    (fecha, titulo, descripcion)
    VALUES (?, ?, ?)
    `,
    [fecha, titulo, descripcion],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "📅 Evento guardado",
      });
    }
  );
});

app.put("/linea-temporal/:id", (req, res) => {
  const { fecha, titulo, descripcion } = req.body;

  conexion.query(
    `
    UPDATE linea_temporal
    SET fecha = ?, titulo = ?, descripcion = ?
    WHERE id = ?
    `,
    [fecha, titulo, descripcion, req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "📅 Evento actualizado",
      });
    }
  );
});

app.delete("/linea-temporal/:id", (req, res) => {
  conexion.query(
    "DELETE FROM linea_temporal WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "🗑️ Evento eliminado",
      });
    }
  );
});

// =====================
// SOBRE NOSOTROS
// =====================

app.get("/sobre-nosotros", (req, res) => {
  conexion.query(
    "SELECT * FROM sobre_nosotros LIMIT 1",
    (err, resultados) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(resultados[0] || {});
    }
  );
});

app.post("/sobre-nosotros", (req, res) => {
  const {
    historia,
    amo_de_vos,
    frase,
    suenos,
  } = req.body;

  conexion.query(
    `
    UPDATE sobre_nosotros
    SET
      historia = ?,
      amo_de_vos = ?,
      frase = ?,
      suenos = ?
    WHERE id = 1
    `,
    [
      historia,
      amo_de_vos,
      frase,
      suenos,
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensaje: "❤️ Información guardada",
      });
    }
  );
});

app.listen(3001, () => {
  console.log("🌙 Servidor ejecutándose en puerto 3001");
});