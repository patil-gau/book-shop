const rateLimit = require("express-rate-limit");

// Define a rate limit configuration
const limiter = rateLimit({
  windowMs: 60 * 1000, // time in milliseconds
  max: 5, // 40 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  trustProxy: true,
});

module.exports = limiter;
