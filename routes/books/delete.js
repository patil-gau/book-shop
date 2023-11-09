const Book = require("../../models/Book");
const { deleteKey } = require("../../services/redis");
const { ENABLE_REDIS } = process.env;

// Delete a book by ID
async function deleteBookById(req, res) {
  try {
    condition = { isActive: true };
    const { id } = req.params;

    if (!id) {
      throw new Error("Id is required");
    }

    condition._id = id;
    const book = await Book.findOneAndUpdate(
      condition,
      {
        $set: { isActive: false, modifiedAt: new Date() },
      },
      { new: true }
    );

    if (!book) {
      throw new Error("Book not found!");
    }

    // clear redis key of deleted book
    if (ENABLE_REDIS === "true") {
      // bookById used in getBookById
      await deleteKey(`bookById-id-${id}`);
      //bookByTitle-title used during time of new book creation
      await deleteKey(`bookByTitle-title-${book.title}`);
    }

    return res.status(200).json({
      success: true,
      message: `Successfully Deleted Book ${book.title}`,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
}

module.exports = { deleteBookById };
