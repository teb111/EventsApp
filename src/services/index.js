const userService = require("./userService.js");
const eventService = require("./eventService.js");

const serviceContainer = () => {
  return {
    userService: userService(),
    eventService: eventService(),
  };
};

module.exports = serviceContainer();
