const express = require("express");
const app = express();

const openPath = (req, res, next) => {
  console.log(`${req.method} http://localhost:${port}${req.path}`);
  next();
};

const auth = (req, res, next) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    console.log("Login success");
    next();
    return;
  }
  res.status(401).send("No auth");
};

app.use(openPath);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.post("/admin", auth, (req, res) => {
  res.send("Trang quan trin noi dung cua admin");
});

const port = 3000;
app.listen(port);
