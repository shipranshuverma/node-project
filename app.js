const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");   // 👈 ADD HERE

const app = express();
app.use(express.json());
app.use(cors());


// 👇 ADD DB CONNECTION HERE (after middleware, before routes)
const mysql = require("mysql2");

function connectWithRetry() {
  const db = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "root",
    database: "testdb"
  });

  db.connect((err) => {
    if (err) {
      console.log("DB not ready, retrying...");
      setTimeout(connectWithRetry, 2000);
    } else {
      console.log("Connected to MySQL");
    }
  });

  return db;
}

const db = connectWithRetry();

db.connect((err) => {
  if (err) {
    console.log("DB connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching data");
    } else {
      res.json(result);
    }
  });
});



app.get("/", (req, res) => {
  res.send("Backend working");
});


// ✅ GET tasks (DB version)
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


// ✅ POST task (DB version)
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  db.query(
    "INSERT INTO tasks (title) VALUES (?)",
    [title],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Task added");
    }
  );
});

app.post("/users", (req, res) => {
  const { title } = req.body;

  db.query(
    "INSERT INTO tasks (title) VALUES (?)",
    [title],
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Insert failed");
      } else {
        res.send("Data inserted");
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});