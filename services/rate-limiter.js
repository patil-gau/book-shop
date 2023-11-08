const rateLimit = require("express-rate-limit");

// Define a rate limit configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // time in milliseconds
  max: 40, // 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

module.exports = limiter;
