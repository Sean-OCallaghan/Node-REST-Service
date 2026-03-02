// Load Environment Variables
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ibmdb = require("ibm_db");

app.use(bodyParser.json());

let db;

const connectionString = process.env.DB2_CONN;

// INIT DB
async function initDb() {
  ibmdb.open(connectionString, (err, conn) => {
    if (err) {
      console.error("Failed to connect to DB2:", err);
      process.exit(1);
    }
    db = conn;
    console.log("Connected to DB2");
  });
}

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  const sql = `INSERT INTO USERS (NAME, EMAIL) VALUES (?, ?)`;

  db.query(sql, [name, email], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json({ message: "User created" });
  });
});

app.get("/users", async (req, res) => {
  const sql = `SELECT id, name, email, mobile FROM db2inst1.users`;
  const result = await db.query(sql);

  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json(data);
  });
});

const PORT = process.env.PORT || 3000;
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
