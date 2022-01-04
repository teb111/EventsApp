const User = require("../models/User.js");
const generateToken = require("../utils/generateToken.js");
const sendMail = require("../mails/mail.js");
const passwordResetMail = require("../mails/passwordResetMail.js");

const userRepository = () => {
  const createUser = async (name, email, password, image) => {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already Exists");
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
        return createdUser;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const userLogin = async (email, password) => {
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
        return result;
      } else {
        throw new Error("Check Login Credentials and Try Again");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const sendPasswordLink = async (email) => {
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
        return "A link has been sent to your Email to continue resetting your password";
      } else {
        throw new Error("No user was found with that email Address");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const passwordReset = async (password, data) => {
    try {
      const user = await User.findOne({ _id: data.userId });

      if (user) {
        if (password) {
          user.password = password;
        }
        await user.save();

        return "Password was changed successfully, Please Log in";
      } else {
        throw new Error("User Not Found");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const getUsernameById = async (id) => {
    const user = await User.findOne({ _id: id });
    if (user) {
      const info = { userName: user.name, email: user.email };
      return info;
    } else {
      throw new Error("User Not found");
    }
  };

  return {
    createUser,
    userLogin,
    sendPasswordLink,
    passwordReset,
    getUsernameById,
  };
};

module.exports = userRepository();
