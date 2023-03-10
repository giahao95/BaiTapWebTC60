const express = require("express");
const app = express();

const openPath = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.hostname}:${port}${req.originalUrl}`
  );
  next();
};

const auth = (req, res, next) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    console.log("Login success");
    next();
  } else {
    res.status(401).send("No auth");
  }
};

app.use(express.json());
app.use(openPath);

// Cách sử dụng middleware auth bằng app.use
// app.use("/admin", auth);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

// app.post("/admin", (req, res) => {
//   res.send("Trang quan trin noi dung cua admin");
// });

app.post("/admin", auth, (req, res) => {
  res.send("Trang quan trin noi dung cua admin");
});

const port = 3000;
app.listen(port);
