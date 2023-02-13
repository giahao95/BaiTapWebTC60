// Bài 1: intro
const array = [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 10];

const newArray = array.filter((item, index) => {
  return item % 2 === 0 && array.indexOf(item) === index;
});

console.log("Bài 1:", newArray);

// Bài 2: global
const json = require("./user.json");
console.log("Bài 2: ", json);

// Bài 3: modules
const queryString = require("querystring");
console.log(
  "Bài 3: ",
  queryString.stringify({
    name: "tuananh",
    children: ["com", "ngo"],
    age: "31",
  })
);

// Bài 4
const myModule = require("./modules");
let [year, month, day] = myModule.birthDay.split("-");
console.log(`Bài 4: ${day}/${month}/${year}`);

//Bài 5
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/index") {
    res.end("Day la trang chu");
  } else if (req.url === "/about") {
    res.end("Day la trang thong tin ca nhan");
  } else {
    res.end("Trang nay khong ton tai");
  }
});

server.listen(5000);
