const sendMail = require("../mails/createdEvent.js");
const Event = require("../models/Event.js");
const Attendee = require("../models/Attendee.js");
const UserRepository = require("../repositories/userRepository.js");
const { isEmpty } = require("../utils/validator.js");
const ResponseMsg = require("../response/message.js");
const {
  StatusConstants,
  PublicConstants,
} = require("../constants/constants.js");

const EventRepository = () => {
  const createEvent = async (options) => {
    try {
      const {
        title,
        isPublic,
        geolocation,
        address,
        startTime,
        endTime,
        userId,
      } = options;
      const checkSimilarEventName = await Event.findOne({
        title,
        status: StatusConstants.STATUS_ACTIVE,
      });
      if (checkSimilarEventName) {
        throw new Error(ResponseMsg.ERROR.ERROR_EVENT_SAME_TITLE);
      } else {
        if (isPublic === PublicConstants.PUBLIC_TRUE) {
          const event = new Event({
            userId,
            title,
            isPublic,
            geolocation,
            address,
            startTime,
            endTime,
          });

          const newEvent = await event.save();

          const info = await UserRepository.getUsernameById(userId);

          sendMail(event, info);

          return newEvent;
        } else {
          const { visibility, attendants, passcode } = options;

          if (isEmpty(visibility) || isEmpty(attendants) || isEmpty(passcode)) {
            throw new Error(ResponseMsg.ERROR.ERROR_MISSING_FIELD);
          }

          const event = new Event({
            userId,
            title,
            isPublic,
            geolocation,
            address,
            startTime,
            endTime,
            attendants,
            visibility,
            passcode,
          });

          const newEvent = await event.save();

          const info = await UserRepository.getUsernameById(userId);
          sendMail(newEvent, info);
          return newEvent;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const eventJoin = async (data) => {
    try {
      // check if the event exists
      const eventExists = await Event.findById(data.eventId);
      if (eventExists) {
        const { isPublic } = eventExists;
        // check if event is public then go ahead and add the user
        if (isPublic === Boolean(PublicConstants.PUBLIC_TRUE)) {
          // check if user is already in the event
          const inEvent = await Attendee.findOne({
            userId: data.userId,
            eventId: data.eventId,
          });
          if (inEvent) {
            throw new Error(ResponseMsg.ERROR.ERROR_IN_EVENT);
          } else {
            const user = new Attendee({
              userId: data.userId,
              eventId: data.eventId,
              mode: "user",
            });

            const addedUser = await user.save();
            return addedUser;
          }
        } else {
          // Checking to see if the passcode the user enter is the ssme as the event passcode
          if (await eventExists.matchPassword(data.passcode)) {
            // check if user is already in the event
            const inEvent = await Attendee.findOne({
              userId: data.userId,
              eventId: data.eventId,
            });
            if (inEvent) {
              throw new Error(ResponseMsg.ERROR.ERROR_IN_EVENT);
            } else {
              const user = new Attendee({
                userId: data.userId,
                eventId: data.eventId,
                mode: "user",
              });

              const addedUser = await user.save();
              return addedUser;
            }
          } else {
            throw new Error(ResponseMsg.ERROR.ERROR_INCORRECT_PASSCODE);
          }
        }
      } else {
        throw new Error(ResponseMsg.ERROR.ERROR_NO_EVENT);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const checkEvent = async (data) => {
    try {
      const event = await Event.findOne({
        _id: data.eventId,
        status: StatusConstants.STATUS_ACTIVE,
      });

      return event;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getAllEvents = async () => {
    let events = [];
    try {
      const event = await Event.find({
        isPublic: Boolean(PublicConstants.PUBLIC_TRUE),
        status: StatusConstants.STATUS_ACTIVE,
      });
      events.push(...event);
      return events;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    createEvent,
    eventJoin,
    checkEvent,
    getAllEvents,
  };
};

module.exports = EventRepository();
