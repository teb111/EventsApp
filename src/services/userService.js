const errorResponse = require("../response/error.js");
const validateEmail = require("../utils/validateMail.js");
const UserRepository = require("../repositories/userRepository.js");

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
      return errorResponse(res, "Something went Wrong", 500, error);
    }
  };

  const authUser = async (req, res) => {
    try {
      const result = await UserRepository.userLogin(req, res);
      return result;
    } catch (error) {
      return errorResponse(res, "Something went Wrong", 500, error);
    }
  };

  return {
    addUser,
    authUser,
  };
};

module.exports = userService;
