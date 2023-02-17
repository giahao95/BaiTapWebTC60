const express = require("express");
const app = express();
const studentsRouter = require("./students");
const teachersRouter = require("./teachers");

app.use("/students", studentsRouter);
app.use("/teachers", teachersRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port} `);
});
