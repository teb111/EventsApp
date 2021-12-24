const errorResponse = require("../response/error");

const eventController = (serviceContainer) => {
  const createEvent = async (req, res) => {
    try {
      const result = await serviceContainer.eventService.newEvent(req, res);
      return result;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    createEvent,
  };
};

module.exports = eventController;
