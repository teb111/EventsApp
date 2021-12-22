const User = require("../models/User.js");
const errorResponse = require("../response/error.js");
const successResponse = require("../response/success.js");
const generateToken = require("../utils/generateToken.js");
const sendMail = require("../utils/mail.js");
const passwordResetMail = require("../utils/passwordResetMail.js");

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

  const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      // checking to see if the password the user entered correlates with the one in the database with our method from userModel
      if (user && (await user.matchPassword(password))) {
        const result = {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id), // generating a token alongside the user's id
        };
        return successResponse(res, result, 200);
      } else {
        return errorResponse(res, "Check Login Credentials and Try Again", 404);
      }
    } catch (error) {
      return errorResponse(res, "Something went Wrong", 500, error);
    }
  };

  const sendPasswordLink = async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (user) {
        const createdUser = {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id), // generating a token alongside the user's id
        };
        passwordResetMail(createdUser);
        return successResponse(
          res,
          "A link has been sent to your Email to continue resetting your password",
          200
        );
      } else {
        return errorResponse(
          res,
          "No user was found with that email Address",
          404
        );
      }
    } catch (error) {
      return errorResponse(res, "Something went Wrong", 500, error);
    }
  };

  const passwordReset = async (req, res) => {
    const data = { userId: req.params.id };
    const { password } = req.body;

    try {
      const user = await User.findOne({ _id: data.userId });

      if (user) {
        if (password) {
          user.password = password;
        }
        await user.save();

        return successResponse(
          res,
          "Password was changed successfully, Please Log in",
          200
        );
      } else {
        return errorResponse(res, "User Not Found", 404);
      }
    } catch (error) {
      return errorResponse(res, "Something went wrong", 500);
    }
  };

  return {
    createUser,
    userLogin,
    sendPasswordLink,
    passwordReset,
  };
};

module.exports = userRepository();
