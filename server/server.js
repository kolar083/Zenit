const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "zenithdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.post("/user/register", async (req, res) => {
  try {
    const { Email, Username, Password } = req.body;

    if (!Email || !Username || !Password) {
      return res.status(400).json("Missing fields.");
    }
    if (!isValidEmail(Email)) {
      return res.status(400).json("Invalid email.");
    }
    if (Username.length < 3 || Username.length > 50) {
      return res.status(400).json("Username must be 3-50 characters.");
    }
    if (Password.length < 6) {
      return res.status(400).json("Password must be at least 6 characters.");
    }

    const [existing] = await pool.query(
      `SELECT Username, Email
       FROM users
       WHERE LOWER(Username) = LOWER(?) OR LOWER(Email) = LOWER(?)
       LIMIT 1`,
      [Username, Email]
    );

    if (existing.length > 0) {
      const row = existing[0];
      if (row.username.toLowerCase() === Username.toLowerCase()) {
        return res.status(409).json("Username already exists.");
      }
      if (row.email.toLowerCase() === Email.toLowerCase()) {
        return res.status(409).json("Email already exists.");
      }
      return res.status(409).json("User already exists.");
    }

    const passwordHash = await bcrypt.hash(Password, 12);

    await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [Username, Email, passwordHash]
    );

    return res.status(201).json({ message: "Registration done!" });
  } catch (err) {
    if (err && err.code === "ER_DUP_ENTRY") {
      return res.status(409).json("Username or email already exists.");
    }

    console.error(err);
    return res.status(500).json("Server error.");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});