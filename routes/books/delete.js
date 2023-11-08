const Book = require("../../models/Book");

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

    return res.status(200).json({
      success: true,
      message: `Successfully Updated Book ${book.title}`,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message, status: false });
  }
}

module.exports = { deleteBookById };
