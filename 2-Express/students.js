const express = require("express");
const studentsRouter = express.Router();

const students = [
  { id: 1, name: "Gia Hao", age: 28 },
  { id: 2, name: "Bao An", age: 30 },
  { id: 3, name: "Kim Chau", age: 26 },
];

studentsRouter.get("/", (req, res) => {
  res.json(students);
});

studentsRouter.get("/add", (req, res) => {
  students.push({ id: 4, name: "Tuan An", age: 20 });
  res.json(students);
});

studentsRouter.get("/delete/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = students.findIndex((student) => id === student.id);
  students.splice(index, 1);
  res.json(students);
});

module.exports = studentsRouter;
