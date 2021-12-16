const userService = require("./userService.js");

const serviceContainer = () => {
  return {
    userService: userService(),
  };
};

module.exports = serviceContainer();
