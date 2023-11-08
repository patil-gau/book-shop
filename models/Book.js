const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
      unique: true,
    },
    author: {
      type: String,
      required: true,
      maxlength: 50,
    },
    publishedYear: {
      type: Number,
      default: null,
    },
    genre: {
      type: String,
      enum: [
        "Fiction",
        "Non-Fiction",
        "Science Fiction",
        "Mystery",
        "Romance",
        "Fantasy",
        "Biography",
        "Other",
      ],
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    strict: true, //only schema keys will be saved in db
  }
);

//add indexes to most searchable keys -> compound index
bookSchema.index({ title: 1, author: 1 });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
