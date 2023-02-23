const express = require("express");
const router = express.Router();
const bookModel = require("../models/book.model");

// lấy tất cả sách
router.get("/", (req, res) => {
  bookModel.find({}).exec((err, books) => {
    if (err) {
      res.send("khong tim thay danh sach sach");
    } else {
      res.send(books);
    }
  });
});

// Tìm sách theo id
router.get("/find/:id", (req, res) => {
  bookModel.findById(req.params.id).exec((err, book) => {
    if (err) {
      res.send("Khong tim thay sach ban can tim");
    } else {
      res.send(book);
    }
  });
});

// Tìm sách theo điều kiện số trang và thể loại
router.get("/find", (req, res) => {
  bookModel.find(
    {
      pages: { $gt: parseInt(req.query.pages) },
      genres: { $size: parseInt(req.query.genres) },
    },
    (err, books) => {
      if (err) {
        res.send("Khong tim thay sach can tim");
      } else {
        res.send(books);
      }
    }
  );
});

// Thêm 1 sách mới
router.post("/", (req, res) => {
  const book = new bookModel({
    title: req.body.title,
    author: req.body.author,
    publication_date: req.body.publication_date,
    pages: req.body.pages,
    genres: req.body.genres,
    publisher: req.body.publisher,
  });

  book.save((err, book) => {
    if (err) {
      res.send("Loi khong luu duoc du lieu nay");
    } else {
      console.log("Luu thanh cong");
      res.send(book);
    }
  });
});

// Cập nhật thông tin sách
router.put("/update/:id", (req, res) => {
  bookModel.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      author: req.body.author,
      publication_date: req.body.publication_date,
      pages: req.body.pages,
      genres: req.body.genres,
      publisher: req.body.publisher,
    },
    (err) => {
      if (err) {
        res.send("Xay ra loi khi cap nhat");
      } else {
        res.status(200).send("Cap nhat thanh cong");
      }
    }
  );
});

// Xóa 1 cuốn sách theo id
router.delete("/delete", (req, res) => {
  bookModel.deleteOne({ _id: req.query.id }, (err) => {
    if (err) {
      res.send("Xay ra loi khi xoa");
    } else {
      res.status(200).send("Xoa thanh cong");
    }
  });
});

module.exports = router;
