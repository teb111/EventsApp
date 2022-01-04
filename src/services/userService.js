const errorResponse = require("../response/error.js");
const validateEmail = require("../mails/validateMail.js");
const UserRepository = require("../repositories/userRepository.js");
const jwt = require("jsonwebtoken");
const util = require("util");
const jwtVerifyAsync = util.promisify(jwt.verify);

const userService = () => {
  const addUser = async (name, email, password, image) => {
    try {
      if (!validateEmail(email)) {
        errorResponse(res, "invalid Email Format");
      } else if (password.length < 6) {
        errorResponse(res, "Password can not be less than 6 characters");
      } else if (name.length < 3) {
        errorResponse(res, "Name can not be less than 3 characters");
      } else {
        const user = await UserRepository.createUser(
          name,
          email,
          password,
          image
        );
        return user;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const authUser = async (email, password) => {
    try {
      const result = await UserRepository.userLogin(email, password);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  const passwordResetLink = async (email) => {
    try {
      if (!validateEmail(email)) {
        throw new Error("invalid Email Format");
      }
      const result = await UserRepository.sendPasswordLink(email);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  const resetPassword = async (password, data) => {
    try {
      const checkToken = await jwtVerifyAsync(
        data.userToken,
        process.env.JWT_SECRET
      );
      if (checkToken) {
        const result = await UserRepository.passwordReset(password, data);
        return result;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    addUser,
    authUser,
    passwordResetLink,
    resetPassword,
  };
};

module.exports = userService;
