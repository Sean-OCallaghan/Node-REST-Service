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

/**
 * POST Create Users
 */
app.post("/users", async (req, res) => {
  const { name, email, mobile } = req.body;

  const sql = `INSERT INTO USERS (NAME, EMAIL, MOBILE) VALUES (?, ?)`;

  db.query(sql, [name, email, mobile], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json({ message: "User created" });
  });
});

/**
 * PUT User by ID
 */
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile } = req.body;

  const sql = `UPDATE USERS SET NAME = ?, EMAIL = ?, MOBILE = ? WHERE ID = ?`;

  db.query(sql, [name, email, mobile, id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json({ message: "User updated" });
  });
});

/**
 * GET Users
 */
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

/**
 * GET User By ID
 */
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM db2inst1.users WHERE id = ?`;

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(data[0]);
  });
});

const PORT = process.env.PORT || 3000;
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
