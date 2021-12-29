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

  const joinEvent = async (req, res) => {
    try {
      const result = await serviceContainer.eventService.enterEvent(req, res);
      return result;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const addImage = async (req, res) => {
    try {
      const result = await serviceContainer.eventService.postImage(req, res);
      return result;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const commentImage = async (req, res) => {
    try {
      const result = await serviceContainer.eventService.imageComment(req, res);
      return result;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    createEvent,
    joinEvent,
    addImage,
    commentImage,
  };
};

module.exports = eventController;
