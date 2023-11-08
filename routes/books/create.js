const Book = require("../../models/Book");

async function createBook(req, res, next) {
  try {
    const { title, author } = req.body;

    if (!(title || author)) {
      throw new Error("Title and Author are required");
    }

    //only keys defined in schema will be saved as strict mode is on
    const bookInstance = new Book(req.body);
    const book = await bookInstance.save();

    return res
      .status(201)
      .json({ message: "successfully created", status: true, data: book });
  } catch (error) {
    return res.status(400).json({ error: error.message, status: false });
  }
}

module.exports = { createBook };
