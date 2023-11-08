const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
  try {
    const token =
      req.header("Authorization").split(" ")[1] ||
      req.header.token ||
      req.params.token;

    if (!token) {
      throw new Error("Token is required");
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    req.userInfo = decoded;

    next();
  } catch (error) {
    return res.status(400).json({ message: error.message, status: 0 });
  }
};

module.exports = verifyToken;
