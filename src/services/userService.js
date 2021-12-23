const errorResponse = require("../response/error.js");
const validateEmail = require("../utils/validateMail.js");
const UserRepository = require("../repositories/userRepository.js");
const jwt = require("jsonwebtoken");
const util = require("util");
const jwtVerifyAsync = util.promisify(jwt.verify);

const userService = () => {
  const addUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      if (!validateEmail(email)) {
        errorResponse(res, "invalid Email Format");
      } else if (password.length < 6) {
        errorResponse(res, "Password can not be less than 6 characters");
      } else if (name.length < 3) {
        errorResponse(res, "Name can not be less than 3 characters");
      } else {
        const user = await UserRepository.createUser(req, res);
        return user;
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const authUser = async (req, res) => {
    try {
      const result = await UserRepository.userLogin(req, res);
      return result;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const passwordResetLink = async (req, res) => {
    const { email } = req.body;
    try {
      if (!validateEmail(email)) {
        return errorResponse(res, "invalid Email Format");
      }
      const result = await UserRepository.sendPasswordLink(req, res);
      return result;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const resetPassword = async (req, res) => {
    const data = { userToken: req.params.token };
    try {
      const checkToken = await jwtVerifyAsync(
        data.userToken,
        process.env.JWT_SECRET
      );
      if (checkToken) {
        if (!req.body.password) {
          return errorResponse(res, "password can not be empty", 400);
        }
        const result = await UserRepository.passwordReset(req, res);
        return result;
        // return successResponse(res, "Token Good", 200);
      }
    } catch (error) {
      return errorResponse(res, error);
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
