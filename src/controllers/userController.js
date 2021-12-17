const errorResponse = require("../response/error");

const userController = (serviceContainer) => {
  const registerUser = async (req, res) => {
    try {
      const result = await serviceContainer.userService.addUser(req, res);
      return result;
    } catch (error) {
      return errorResponse(res, error.message, 500, error);
    }
  };

  return {
    registerUser,
  };
};

module.exports = userController;
