const express = require("express");
const router = express.Router();
const Joi = require("joi");

const books = [
  { id: 1, title: "Book 1", author: "Author 1" },
  { id: 2, title: "Book 2", author: "Author 2" },
  { id: 3, title: "Book 3", author: "Author 3" },
];

const booksSchema = Joi.object({
  title: Joi.string().min(3).required(),
  author: Joi.string().min(5).required(),
});

router.get("/get-all", (req, res) => {
  res.send(books);
});

router.post("/create", (req, res) => {
  let validateResult = booksSchema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).send(validateResult.error.details[0].message);
  }

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };

  books.push(book);
  res.send(book);
});

router.put("/update/:id", (req, res) => {
  let id = parseInt(req.params.id);
  const result = books.find((book) => id === book.id);
  if (!result) {
    return res.status(404).send("Khong tim thay sach ban dang tim");
  }

  let validateResult = booksSchema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).send(validateResult.error.details[0].message);
  }

  result.title = req.body.title;
  result.author = req.body.author;
  res.send(result);
});

router.delete("/delete/:id", (req, res) => {
  let id = parseInt(req.params.id);
  const index = books.findIndex((book) => id === book.id);
  if (index < 0) {
    return res.status(404).send("Khong xoa duoc sach ban muon");
  }

  books.splice(index, 1);
  res.send(books);
});

module.exports = router;
