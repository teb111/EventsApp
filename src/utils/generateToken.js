const jwt = require("jsonwebtoken");

// it will generate a token alongside the user's id

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10m", // setting the token to expire in 2 hours
  });
};

module.exports = generateToken;
