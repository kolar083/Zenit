const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./DbConnect');
const cors = require('cors');
const router = express.Router();
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "zenithdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(express.json());
app.use(cors());
app.use('/user',router);

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post('/register', async (req, res) => {
  const { Username, Email, Password } = req.body;

  if (!Username || !Email || !Password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!isValidEmail(Email)) {
    return res.status(400).json({ message: "Email is not valid" });
  }

  try {
    const checkQuery = `
      SELECT Username, Email
      FROM users
      WHERE LOWER(Username) = LOWER(?) OR LOWER(Email) = LOWER(?)
      LIMIT 1
    `;

    db.query(checkQuery, [Username, Email], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length > 0) {
        const row = results[0];

        if (row.Username.toLowerCase() === Username.toLowerCase()) {
          return res.status(409).json({ message: "Username already exists." });
        }
        if (row.Email.toLowerCase() === Email.toLowerCase()) {
          return res.status(409).json({ message: "Email already exists." });
        }
        return res.status(409).json({ message: "User already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const HashPassword = await bcrypt.hash(Password, salt);

      const insertQuery =
        "INSERT INTO users (Username, Password, Email) VALUES (?, ?, ?)";

      db.query(insertQuery, [Username, HashPassword, Email], (err2) => {
        if (err2) {
          console.error(err2);
          return res.status(500).json({ message: "Error while registering user" });
        }
        return res.status(201).json({ message: "User has been added to the database" });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error while registering user" });
  }
});

app.listen(PORT,()=>{
    console.log('Server je na portu ' + PORT);
})

module.exports = router;