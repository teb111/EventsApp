const sendMail = require("../mails/createdEvent.js");
const Event = require("../models/Event.js");
const errorResponse = require("../response/error.js");
const successResponse = require("../response/success.js");
const UserRepository = require("../repositories/userRepository.js");

const EventRepository = () => {
  const createEvent = async (req, res) => {
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
          const event = await Event.create({
            userId,
            title,
            isPublic,
            geolocation,
            address,
            startTime,
            endTime,
          });

          if (event) {
            const createdEvent = {
              _id: event._id,
              userId: event.userId,
              title: event.title,
              isPublic: event.isPublic,
              geolocation: event.geolocation,
              address: event.address,
              startTime: event.startTime,
              endTime: event.endTime,
            };
            const info = await UserRepository.getUsernameById(userId);

            sendMail(createdEvent, info);

            return successResponse(res, createdEvent, 201);
          }
        } else {
          const { visibility, attendants, passcode } = req.body;

          const event = await Event.create({
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

          if (event) {
            const createdEvent = {
              _id: event._id,
              userId: event.userId,
              title: event.title,
              isPublic: event.isPublic,
              geolocation: event.geolocation,
              address: event.address,
              startTime: event.startTime,
              endTime: event.endTime,
              attendants: event.attendants,
              visibility: event.visibility,
              passcode: event.passcode,
            };
            const info = await UserRepository.getUsernameById(userId);
            sendMail(createdEvent, info);
            return successResponse(res, createdEvent, 201);
          }
        }
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    createEvent,
  };
};

module.exports = EventRepository();
