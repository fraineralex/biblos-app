const express = require("express");
const router = express.Router();

const BooksController = require("../controllers/BooksController");

router.get("/books", BooksController.GetBooks);
router.post("/AddBook", BooksController.AddBook);

module.exports = router;
