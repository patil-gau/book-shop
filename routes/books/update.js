const Book = require("../../models/Book");
// Update a book by ID
async function updateBookById(req, res, next) {
  try {
    condition = { isActive: true };
    const { id } = req.params;
    const { author, title } = req.body;

    if (!id) {
      throw new Error("Id is required");
    }

    if (!(author && title)) {
      throw new Error("Author and Title are required");
    }

    condition._id = id;

    req.body.modifiedAt = new Date();
    const book = await Book.findOneAndUpdate(condition, req.body, {
      new: true,
    });
    if (!book) {
      throw new Error("Book not found");
    }
    return res
      .status(200)
      .json({ status: true, message: "Successfully Updated", data: book });
  } catch (error) {
    return res.status(400).json({ error: error.message, status: false });
  }
}

module.exports = { updateBookById };
