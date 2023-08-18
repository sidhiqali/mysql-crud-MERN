import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    err ? res.json(err) : res.json(data);
  });
});
app.get("/books/:id", (req, res) => {
  const q = "SELECT * FROM books WHERE book_id= ?";
  const bookId = req.params.id;
  db.query(q, [bookId], (err, data) => {
    err ? res.json(err) : res.json(data);
  });
});
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?) ";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    err ? res.json(err) : res.json("successfully created");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE book_id = ? ";
  db.query(q, [bookId], (err, data) => {
    err ? res.json(err) : res.json("successfully deleted");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`=?, `desc`=?, `cover`=? WHERE `book_id`=?";
  const values = [req.body.title, req.body.desc, req.body.cover, bookId];

  db.query(q, values, (err, data) => {
    if (err) {
      res.json(err);
    } else if (data.affectedRows === 0) {
      res.status(404).json("Book not found");
    } else {
      res.json("Successfully updated");
    }
  });
});

app.get("/", (req, res) => {
  res.send("server running successfully");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
