const errorResponse = require("../response/error.js");
const User = require("../models/User.js");
const EventRepository = require("../repositories/eventRepository.js");
const AttendeeRepository = require("../repositories/AttendeeRepository.js");
const ImageRepository = require("../repositories/ImageRepository.js");
const { isEmpty } = require("../utils/validator.js");
const successResponse = require("../response/success.js");
const ReviewRepository = require("../repositories/ReviewRepository.js");
const ReactionRepository = require("../repositories/ReactionRepository.js");

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

  const postImage = async (req, res) => {
    try {
      // check if event exist and still onGoing
      const event = await EventRepository.checkEvent(req, res);
      if (event) {
        const attendee = await AttendeeRepository.checkAttendee(req, res);
        if (attendee) {
          const image = await ImageRepository.addImage(req, res);
          if (image) {
            return successResponse(res, image);
          } else {
            return errorResponse(res, "Something went wrong");
          }
        } else {
          return errorResponse(res, "No, You do not have access to this event");
        }
      } else {
        return errorResponse(res, "This Event is no longer active");
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const imageComment = async (req, res) => {
    try {
      // check if event exist and still onGoing
      const event = await EventRepository.checkEvent(req, res);
      if (event) {
        const attendee = await AttendeeRepository.checkAttendee(req, res);
        if (attendee) {
          const review = await ReviewRepository.addReview(req, res);
          if (review) {
            return successResponse(res, review);
          } else {
            return errorResponse(res, "Something went wrong");
          }
        } else {
          return errorResponse(res, "No, You do not have access to this event");
        }
      } else {
        return errorResponse(res, "This Event is no longer active");
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const imageFetch = async (req, res) => {
    try {
      // check if event exist and still onGoing
      const event = await EventRepository.checkEvent(req, res);
      if (event) {
        const attendee = await AttendeeRepository.checkAttendee(req, res);
        if (attendee) {
          const comments = await ReviewRepository.getImageReviews(req, res);
          return comments;
        } else {
          return errorResponse(
            res,
            "Sorry, You do not have access to the event"
          );
        }
      } else {
        return errorResponse(res, "This event is no longer active");
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const eventFetch = async (req, res) => {
    try {
      const events = await EventRepository.getAllEvents(req, res);
      return events;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const imageReact = async (req, res) => {
    try {
      const reaction = await ReactionRepository.reactionAdd(req, res);
      return reaction;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    newEvent,
    enterEvent,
    postImage,
    imageComment,
    imageFetch,
    eventFetch,
    imageReact,
  };
};

module.exports = eventService;
