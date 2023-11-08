const express = require("express");
const router = express.Router();

// ****** AUTH  ******** //
const { login } = require("./auth/login");
router.post("/login", login);
// ****** AUTH ******** //

// ****** TOKEN VERIFICATION ******** //
const { verifyToken } = require("../middlewares/auth/verify-token");
router.use(verifyToken);
// ****** TOKEN VERIFICATION ******** //

// ****** BOOK management ******** //
const { createBook } = require("./books/create");
const { updateBookById } = require("./books/update");
const { getAllBooks, getBookById } = require("./books/get");
const { deleteBookById } = require("./books/delete");

router.post("/book", createBook);
router.put("/book/:id", updateBookById);
router.get("/book/:id", getBookById);
router.get("/books", getAllBooks);
router.delete("/book/:id", deleteBookById);
// ****** BOOK management ******** //

module.exports = router;
