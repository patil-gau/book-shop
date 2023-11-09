const Book = require("../../models/Book");
const { getKey, setKey } = require("../../services/redis");
const { ENABLE_REDIS } = process.env;
// Get a specific book by ID
async function getBookById(req, res, next) {
  try {
    let condition = { isActive: true };

    condition._id = req.params.id;

    const cacheKey = `bookById-id-${req.params.id}`;
    if (ENABLE_REDIS === "true") {
      const cachedBook = await getKey(cacheKey);
      if (cachedBook) {
        return res.status(200).json({
          status: true,
          message: "Successfully fetched",
          data: cachedBook,
        });
      }
    }

    const book = await Book.findOne(condition, {
      __v: 0,
      modifiedAt: 0,
      createdAt: 0,
    });
    if (!book) {
      throw new Error("Book not found");
    }
    ENABLE_REDIS === "true" && (await setKey(cacheKey, book)); //30 minutes by default

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
    const books = await Book.find(condition, {
      __v: 0,
      modifiedAt: 0,
      createdAt: 0,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

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
