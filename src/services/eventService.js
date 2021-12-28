const errorResponse = require("../response/error.js");
const User = require("../models/User.js");
const EventRepository = require("../repositories/eventRepository.js");
const { isEmpty } = require("../utils/validator.js");
const successResponse = require("../response/success.js");

const eventService = () => {
  const newEvent = async (req, res) => {
    try {
      const { title, isPublic, geolocation, address, startTime, endTime } =
        req.body;
      if (
        isEmpty(title) ||
        isEmpty(isPublic) ||
        isEmpty(geolocation) ||
        isEmpty(address) ||
        isEmpty(startTime) ||
        isEmpty(endTime)
      ) {
        return errorResponse(res, "Please fill all required fields");
      }

      const event = await EventRepository.createEvent(req, res);
      return event;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const enterEvent = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-password");
      if (user) {
        const event = await EventRepository.eventJoin(req, res);
        return event;
      } else {
        return errorResponse(res, "Please Log in");
      }
    } catch (error) {
      return errorResponse(res, "Something went wrong");
    }
  };

  return {
    newEvent,
    enterEvent,
  };
};

module.exports = eventService;
