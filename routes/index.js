const express = require("express");
const router = express.Router();

const { verifyToken } = require("../../middlewares/auth/verify-token");
router.use(verifyToken);

// ****** AUTHENTICATION  ******** //
const { login } = require("./auth/login");
router.post("/login", login);
// ****** AUTHENTICATION ******** //

// ****** BOOK management ******** //
const { createBook } = require("./books/create");
const { updateBookById } = require("./books/update");
const { getAllBooks, getBookById } = require("./books/get");
const { deleteBookById } = require("./books/delete");

router.post("/book", createBook);
router.put("/book/:id", updateBookById);
router.get("/book/:id", getBookById);
router.get("/book", getAllBooks);
router.delete("/book/:id", deleteBookById);
// ****** BOOK management ******** //

module.exports = router;
