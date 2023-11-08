const mongoose = require("mongoose");

const databaseUrl = process.env.DB_URL;

const databaseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
};

function connectToDB() {
  mongoose.connect(databaseUrl, databaseOptions);
  const db = mongoose.connection;

  db.on("error", (err) => {
    console.log("[ERROR] MongoDB connection error", err);
    process.exit(0);
  });
  db.once("open", () => {
    console.log("[INFO] Connected to MongoDB database");
  });
}

module.exports = connectToDB;
