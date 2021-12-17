const userController = (serviceContainer) => {
  const registerUser = async (req, res) => {
    try {
      const result = await serviceContainer.userService.addUser(req, res);
      return result;
    } catch (error) {
      return res.code(500).send({
        success: false,
        message:
          error instanceof Error ? error.message : "Something Went Wrong",
      });
    }
  };

  return {
    registerUser,
  };
};

module.exports = userController;
