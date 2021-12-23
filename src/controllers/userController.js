const errorResponse = require("../response/error");

const userController = (serviceContainer) => {
  const registerUser = async (req, res) => {
    try {
      const result = await serviceContainer.userService.addUser(req, res);
      return result;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const loginUser = async (req, res) => {
    try {
      const result = await serviceContainer.userService.authUser(req, res);
      return result;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const getPasswordResetLink = async (req, res) => {
    try {
      const result = await serviceContainer.userService.passwordResetLink(
        req,
        res
      );
      return result;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const resetUserPassword = async (req, res) => {
    try {
      const result = await serviceContainer.userService.resetPassword(req, res);
      return result;
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
