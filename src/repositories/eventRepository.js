const sendMail = require("../mails/createdEvent.js");
const Event = require("../models/Event.js");
const Attendee = require("../models/Attendee.js");
const UserRepository = require("../repositories/userRepository.js");
const { isEmpty } = require("../utils/validator.js");

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
        status: "active",
      });
      if (checkSimilarEventName) {
        throw new Error(
          "Event with the same title already exists, Please choose a different title"
        );
      } else {
        if (isPublic === "true") {
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
            throw new Error("Required fields  Empty");
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
        if (isPublic === true) {
          // check if user is already in the event
          const inEvent = await Attendee.findOne({
            userId: data.userId,
            eventId: data.eventId,
          });
          if (inEvent) {
            return "You are already in this event";
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
              return "You are already in this event";
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
            throw new Error("Incorrect Passcode");
          }
        }
      } else {
        throw new Error("Sorry this event does not exist anymmore");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const checkEvent = async (data) => {
    try {
      const event = await Event.findOne({
        _id: data.eventId,
        status: "active",
      });

      return event;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getAllEvents = async () => {
    let events = [];
    try {
      const event = await Event.find({ isPublic: true, status: "active" });
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
