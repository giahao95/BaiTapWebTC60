const express = require("express");
const router = express.Router();
const CarModel = require("../model/car.model");

router.post("/", (req, res) => {
  const car = new CarModel();
  car.name = req.body.name;
  car.manufacturer = req.body.manufacturer;
  car.price = req.body.price;

  car.save((err, car) => {
    if (err) {
      res.send("Them khong thanh cong");
    } else {
      console.log("Them thanh cong");
      res.send(car);
    }
  });
});

router.get("/", (req, res) => {
  CarModel.find({ name: req.query.name }).exec((err, cars) => {
    if (err) {
      res.send("Khong the lay thong tin xe oto");
    } else {
      console.log("Lay thanh cong danh sach xe oto");
      res.json(cars);
    }
  });
});

router.get("/:id", (req, res) => {
  CarModel.findOne({ _id: req.params.id }).exec((err, car) => {
    if (err) {
      res.send("Co loi xay re");
    } else {
      console.log("Tim thanh cong");
      res.json(car);
    }
  });
});

router.put("/:id", (req, res) => {
  CarModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: { name: req.body.name },
    },
    {
      upsert: true,
    },
    (err, car) => {
      if (err) {
        res.send("Cap nhat that bai");
      } else {
        res.status(200).send("Cap that thanh cong");
      }
    }
  );
});

module.exports = router;
