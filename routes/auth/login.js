const jwt = require("jwt");

const User = require("../../models/User");
const { SECRET_KEY } = process.env;

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!(email || password)) {
      throw new Error("Email and Password are required!");
    }

    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      throw new Error("Invalid username or password");
    }

    //TODO: hashing of password
    // const passwordMatch = await bcrypt.compare(password, user.password);

    const passwordMatch = user.password === password;

    if (!passwordMatch) {
      throw new Error("Invalid username or password");
    }

    // Create a JWT token for the authenticated user
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      SECRET_KEY,
      {
        expiresIn: "8h",
      }
    );

    return res
      .status(200)
      .json({ message: "Enjoy your Token", status: true, token });
  } catch (error) {
    return res.status(400).json({ error: error.message, status: false });
  }
}

module.exports = { login };
