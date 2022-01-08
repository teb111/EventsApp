const User = require("../models/User.js");
const EventRepository = require("../repositories/eventRepository.js");
const AttendeeRepository = require("../repositories/AttendeeRepository.js");
const ImageRepository = require("../repositories/ImageRepository.js");
const ReviewRepository = require("../repositories/ReviewRepository.js");
const ReactionRepository = require("../repositories/ReactionRepository.js");
const ResponseMsg = require("../response/message.js");

const eventService = () => {
  const newEvent = async (options) => {
    try {
      const event = await EventRepository.createEvent(options);
      return event;
    } catch (error) {
      throw new Error(error);
    }
  };

  const enterEvent = async (data) => {
    try {
      const user = await User.findById(data.userId).select("-password");
      if (user) {
        const event = await EventRepository.eventJoin(data);
        return event;
      } else {
        throw new Error(ResponseMsg.ERROR.ERROR_LOG_IN);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const postImage = async (data) => {
    try {
      // check if event exist and still onGoing
      const event = await EventRepository.checkEvent(data);
      if (event) {
        const attendee = await AttendeeRepository.checkAttendee(data);
        if (attendee) {
          const image = await ImageRepository.addImage(data);
          if (image) {
            return image;
          } else {
            throw new Error(ResponseMsg.ERROR.ERROR_WENT_WRONG);
          }
        } else {
          throw new Error(ResponseMsg.ERROR.ERROR_EVENT_ACCESS_DENIED);
        }
      } else {
        throw new Error(ResponseMsg.ERROR.ERROR_EVENT_INACTIVE);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const imageComment = async (data) => {
    try {
      // check if event exist and still onGoing
      const event = await EventRepository.checkEvent(data);
      if (event) {
        const attendee = await AttendeeRepository.checkAttendee(data);
        if (attendee) {
          const review = await ReviewRepository.addReview(data);
          if (review) {
            return review;
          } else {
            throw new Error(ResponseMsg.ERROR.ERROR_WENT_WRONG);
          }
        } else {
          throw new Error(ResponseMsg.ERROR.ERROR_EVENT_ACCESS_DENIED);
        }
      } else {
        throw new Error(ResponseMsg.ERROR.ERROR_EVENT_INACTIVE);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const imageFetch = async (data) => {
    try {
      // check if event exist and still onGoing
      const event = await EventRepository.checkEvent(data);
      if (event) {
        const attendee = await AttendeeRepository.checkAttendee(data);
        if (attendee) {
          const comments = await ReviewRepository.getImageReviews(data);
          return comments;
        } else {
          throw new Error(ResponseMsg.ERROR.ERROR_EVENT_ACCESS_DENIED);
        }
      } else {
        throw new Error(ResponseMsg.ERROR.ERROR_EVENT_INACTIVE);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const eventFetch = async () => {
    try {
      const events = await EventRepository.getAllEvents();
      return events;
    } catch (error) {
      throw new Error(error);
    }
  };

  const imageReact = async (data) => {
    try {
      const reaction = await ReactionRepository.reactionAdd(data);
      return reaction;
    } catch (error) {
      throw new Error(error);
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
