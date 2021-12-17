const User = require("../models/User.js");
const errorResponse = require("../response/error.js");
const successResponse = require("../response/success.js");
const generateToken = require("../utils/generateToken.js");
const sendMail = require("../utils/mail.js");

const userRepository = () => {
  const createUser = async (req, res) => {
    const { name, email, password, image } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return errorResponse(res, "User already Exists", 400);
    }

    try {
      const user = await User.create({
        name,
        email,
        password,
        image,
      });

      if (user) {
        const createdUser = {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id), // generating a token alongside the user's id
        };
        sendMail(createdUser);
        return successResponse(res, createdUser, 201);
      }
    } catch (error) {
      return errorResponse(res, "Invalid User Data", 400, error);
    }
  };

  return {
    createUser,
  };
};

module.exports = userRepository();
