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
const generatePassword = require("../utils/generatePassword.js");
const increaseAttendants = require("../utils/increaseAttendants.js");

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
        throw (ResponseMsg.ERROR.ERROR_EVENT_SAME_TITLE);
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
            attendants: 1
          });

          await event.save();

          const newEvent = {
            userId: event.userId,
            eventId: event._id,
            title: event.title,
            isPublic: event.isPublic,
            geolocation: event.geolocation,
            address: event.address,
            startTime: event.startTime,
            endTime: event.endTime,

          }

          // add the creator to the event immediately
          const user = new Attendee({
            userId: newEvent.userId,
            eventId: newEvent.eventId,
            mode: "admin",
          });

          await user.save();

          const info = await UserRepository.getUsernameById(userId);

          sendMail(event, info);

          return newEvent;
        } else {
          const passcode = generatePassword();

          const event = new Event({
            userId,
            title,
            isPublic,
            geolocation,
            address,
            startTime,
            endTime,
            passcode,
            attendants: 1
          });

          await event.save();

          const newEvent = {
            userId: event.userId,
            eventId: event._id,
            title: event.title,
            isPublic: event.isPublic,
            geolocation: event.geolocation,
            address: event.address,
            startTime: event.startTime,
            endTime: event.endTime,
            passcode,
          }

          // add the creator to the event immediately
          const user = new Attendee({
            userId: newEvent.userId,
            eventId: newEvent.eventId,
            mode: "admin",
          });

          await user.save();


          const info = await UserRepository.getUsernameById(userId);
          sendMail(newEvent, info);
          return newEvent;
        }
      }
    } catch (error) {
      throw (error);
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
            throw (ResponseMsg.ERROR.ERROR_IN_EVENT);
          } else {
            const user = new Attendee({
              userId: data.userId,
              eventId: data.eventId,
              mode: "user",
            });

            increaseAttendants(data.eventId);
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
              throw (ResponseMsg.ERROR.ERROR_IN_EVENT);
            } else {
              const user = new Attendee({
                userId: data.userId,
                eventId: data.eventId,
                mode: "user",
              });

              increaseAttendants(data.eventId);

              const addedUser = await user.save();
              return addedUser;
            }
          } else {
            throw (ResponseMsg.ERROR.ERROR_INCORRECT_PASSCODE);
          }
        }
      } else {
        throw (ResponseMsg.ERROR.ERROR_NO_EVENT);
      }
    } catch (error) {
      throw (error);
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
      throw (error);
    }
  };

  const getAllEvents = async () => {
    try {
      let events = [];
      const event = await Event.find({
        isPublic: Boolean(PublicConstants.PUBLIC_TRUE),
        status: StatusConstants.STATUS_ACTIVE,
      }).populate("userId", "name email image");
      events.push(...event);
      return events;
    } catch (error) {
      throw (error);
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
