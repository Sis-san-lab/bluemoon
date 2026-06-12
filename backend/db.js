import mysql from "mysql2";

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "s1j2r393",
  database: "bluemoon",
});

conexion.connect((err) => {
  if (err) {
    console.log("❌ Error MySQL:", err);
    return;
  }

  console.log("✅ Conectado a MySQL");
});

export default conexion;