const Book = require("../../models/Book");
const { getKey, setKey } = require("../../services/redis");
const { ENABLE_REDIS } = process.env;
async function createBook(req, res, next) {
  try {
    const { title, author } = req.body;

    if (!(title && author)) {
      throw new Error("Title and Author are required");
    }

    //check if the book title already
    let isBookExist;
    if (ENABLE_REDIS === "true") {
      const isBookExistRedisKey = `bookByTitle-title-${title}`;
      isBookExist = await getKey(isBookExistRedisKey);
    }

    if (!isBookExist) {
      isBookExist = await Book.findOne({ title, isActive: true });
      if (isBookExist) {
        throw new Error("Book Title Already Exists");
      }

      ENABLE_REDIS === "true" &&
        (await setKey(isBookExistRedisKey, isBookExist)); //30 minutes by default
    }

    //only keys defined in schema will be saved as strict mode is on
    const bookInstance = new Book(req.body);
    const book = await bookInstance.save();

    return res
      .status(201)
      .json({ message: "successfully created", status: true, data: book });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
}

module.exports = { createBook };
