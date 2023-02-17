const express = require("express");
const teachersRouter = express.Router();

const teachers = [
  { id: 1, name: "Nguyen Tuan Anh", age: 30, class: "2A" },
  { id: 2, name: "Luong Tran", age: 44, class: "2B" },
  { id: 3, name: "Le Tien Dung", age: 45, class: "2C" },
];

teachersRouter.get("/", (req, res) => {
  res.json(teachers);
});

teachersRouter.get("/add", (req, res) => {
  teachers.push({
    id: 4,
    name: "Gia Hao",
    age: 28,
    class: "2D",
  });
  res.json(teachers);
});

teachersRouter.get("/delete/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = teachers.findIndex((teacher) => id === teacher.id);
  teachers.splice(index, 1);
  res.json(teachers);
});

teachersRouter.get("/find/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let result = teachers.find((teacher) => teacher.id === id);
  if (result) {
    res.json(result);
  } else {
    res.send("Khong tim thay giao vien");
  }
});

teachersRouter.get("/:id/class/:className", (req, res) => {
  let id = parseInt(req.params.id);
  let className = req.params.className.toUpperCase();
  let result = teachers.find(
    (teacher) => id === teacher.id && className === teacher.class
  );
  if (result) {
    res.json(result);
  } else {
    res.json("Khong tim thay giao vien");
  }
});

teachersRouter.get("/find", (req, res) => {
  let age = parseInt(req.query.age);
  let className = req.query.class.toUpperCase();
  const result = teachers.find(
    (teacher) => age === teacher.age && className === teacher.class
  );
  if (result) {
    res.json(result);
  } else {
    res.send("Khong tim thay giao vien");
  }
});

module.exports = teachersRouter;
