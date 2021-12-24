const errorResponse = require("../response/error.js");
const EventRepository = require("../repositories/eventRepository.js");
const { isEmpty } = require("../utils/validator.js");

const eventService = () => {
  const newEvent = async (req, res) => {
    const {
      userId,
      title,
      isPublic,
      geolocation,
      address,
      startTime,
      endTime,
    } = req.body;
    try {
      if (
        isEmpty(userId) ||
        isEmpty(title) ||
        isEmpty(isPublic) ||
        isEmpty(geolocation) ||
        isEmpty(address) ||
        isEmpty(startTime) ||
        isEmpty(endTime)
      ) {
        return errorResponse(res, "Please fill all required fields");
      } else {
        const result = await EventRepository.createEvent(req, res);
        return result;
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    newEvent,
  };
};

module.exports = eventService;
