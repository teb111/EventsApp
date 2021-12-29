const sendMail = require("../mails/createdEvent.js");
const Event = require("../models/Event.js");
const Attendee = require("../models/Attendee.js");
const errorResponse = require("../response/error.js");
const successResponse = require("../response/success.js");
const UserRepository = require("../repositories/userRepository.js");

const EventRepository = () => {
  const createEvent = async (req, res) => {
    try {
      const { title, isPublic, geolocation, address, startTime, endTime } =
        req.body;
      const checkSimilarEventName = await Event.findOne({
        title,
        status: "active",
      });
      if (checkSimilarEventName) {
        return errorResponse(
          res,
          "Event with the same title already exists, Please choose a different title"
        );
      } else {
        if (isPublic === "true") {
          const event = new Event({
            userId: req.user._id,
            title,
            isPublic,
            geolocation,
            address,
            startTime,
            endTime,
          });

          const newEvent = await event.save();

          const info = await UserRepository.getUsernameById(req.user._id);

          sendMail(event, info);

          return successResponse(res, newEvent, 201);
        } else {
          const { visibility, attendants, passcode } = req.body;

          const event = new Event({
            userId: req.user._id,
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

          const info = await UserRepository.getUsernameById(req.user._id);
          sendMail(newEvent, info);
          return successResponse(res, newEvent, 201);
        }
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const eventJoin = async (req, res) => {
    try {
      // check if the event exists
      const eventExists = await Event.findById(req.params.id);
      if (eventExists) {
        const { isPublic } = eventExists;
        // check if event is public then go ahead and add the user
        if (isPublic === true) {
          // check if user is already in the event
          const inEvent = await Attendee.findOne({
            userId: req.user._id,
            eventId: req.params.id,
          });
          if (inEvent) {
            return successResponse(res, "You are already in this event");
          } else {
            const user = new Attendee({
              userId: req.user._id,
              eventId: req.params.id,
              mode: "user",
            });

            const addedUser = await user.save();
            return successResponse(res, addedUser);
          }
        } else {
          const { passcode } = req.body;
          // Checking to see if the passcode the user enter is the ssme as the event passcode
          if (await eventExists.matchPassword(passcode)) {
            // check if user is already in the event
            const inEvent = await Attendee.findOne({
              userId: req.user._id,
              eventId: req.params.id,
            });
            if (inEvent) {
              return successResponse(res, "You are already in this event");
            } else {
              const user = new Attendee({
                userId: req.user._id,
                eventId: req.params.id,
                mode: "user",
              });

              const addedUser = await user.save();
              return successResponse(res, addedUser);
            }
          } else {
            return errorResponse(res, "Incorrect passcode");
          }
        }
      } else {
        return errorResponse(res, "Sorry this event does not exist anymmore");
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const checkEvent = async (req, res) => {
    try {
      const event = await Event.findOne({
        _id: req.params.id,
        status: "active",
      });

      return event;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    createEvent,
    eventJoin,
    checkEvent,
  };
};

module.exports = EventRepository();
