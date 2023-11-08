const Book = require("../../models/Book");

// Get a specific book by ID
async function getBookById(req, res, next) {
  try {
    condition = { isActive: true };
    const { id } = req.params;

    if (!id) {
      throw new Error("Id is required");
    }

    condition._id = id;
    const book = await Book.findById(id);
    if (!book) {
      throw new Error("Book not found");
    }
    return res
      .status(200)
      .json({ status: true, message: "Successfully fetched", data: book });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
}

//Get All Books
async function getAllBooks(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const condition = { isActive: true };
  try {
    const skip = (page - 1) * limit;

    let total;
    if (!skip) {
      total = await Book.find(condition).countDocuments();
    }
    const books = await Book.find(condition)
      .skip(skip)
      .limit(limit)
      .sort({ modifiedAt: -1 });

    if (!books?.length) {
      throw new Error("No books found!");
    }
    return res.status(200).json({
      success: true,
      message: "Successfully fetched!",
      data: books,
      total,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
};
