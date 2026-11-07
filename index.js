import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
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
  "SELECT * FROM brotherhood_users WHERE username = $1",
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


if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;