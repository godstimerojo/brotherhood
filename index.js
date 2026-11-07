import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// db.connect();

db.connect()
  .then(() => {
    console.log("Connected to the Brotherhood database!");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });


app.get("/", (req, res) => {
  res.render("login", {
    error: null
  });
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const result = await db.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  const user = result.rows[0];

  if (!user) {
  return res.render("login", {
    error: "User not found"
  });
}

if (password !== user.password) {
  return res.render("login", {
    error: "Incorrect password"
  });
}
  res.render("index");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});