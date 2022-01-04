const errorResponse = require("../response/error");
const successResponse = require("../response/success");
const { isEmpty } = require("../utils/validator");

const userController = (serviceContainer) => {
  const registerUser = async (req, res) => {
    try {
      if (
        typeof req.body !== null &&
        req.body.hasOwnProperty("name") &&
        req.body.hasOwnProperty("email") &&
        req.body.hasOwnProperty("password")
      ) {
        const { name, email, password, image } = req.body;
        if (
          isEmpty(name) ||
          isEmpty(email) ||
          isEmpty(password) ||
          isEmpty(image)
        ) {
          return errorResponse(res, "Please fill all required fields");
        } else {
          const result = await serviceContainer.userService.addUser(
            name,
            email,
            password,
            image
          );
          return successResponse(res, result);
        }
      } else {
        return errorResponse(
          res,
          "Properties missing, Please check body content"
        );
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const loginUser = async (req, res) => {
    try {
      if (
        typeof req.body !== null &&
        req.body.hasOwnProperty("email") &&
        req.body.hasOwnProperty("password")
      ) {
        const { email, password } = req.body;
        if (isEmpty(email) || isEmpty(password)) {
          return errorResponse(res, "Email or password cannot be Empty");
        } else {
          const result = await serviceContainer.userService.authUser(
            email,
            password
          );
          return successResponse(res, result);
        }
      } else {
        return errorResponse(
          res,
          "Properties missing, Please check body content"
        );
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const getPasswordResetLink = async (req, res) => {
    try {
      if (typeof req.body !== null && req.body.hasOwnProperty("email")) {
        const { email } = req.body;
        if (isEmpty(email)) {
          return errorResponse(res, "Email cannot be Empty");
        } else {
          const result = await serviceContainer.userService.passwordResetLink(
            email
          );
          return successResponse(res, result);
        }
      } else {
        return errorResponse(
          res,
          "Properties missing, Please check body content"
        );
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const resetUserPassword = async (req, res) => {
    const data = { userId: req.params.id, userToken: req.params.token };

    try {
      if (typeof req.body !== null && req.body.hasOwnProperty("password")) {
        const { password } = req.body;
        if (
          isEmpty(password) ||
          isEmpty(data.userId) ||
          isEmpty(data.userToken)
        ) {
          return errorResponse(res, "Fields cannot be Empty");
        } else {
          const result = await serviceContainer.userService.resetPassword(
            password,
            data
          );
          return successResponse(res, result);
        }
      } else {
        return errorResponse(
          res,
          "Properties missing, Please check body content"
        );
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    registerUser,
    loginUser,
    getPasswordResetLink,
    resetUserPassword,
  };
};

module.exports = userController;
