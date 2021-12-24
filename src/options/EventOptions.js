const ServiceContainer = require("../services");
const EventController = require("../controllers/eventController");
const EventControllerHandler = EventController(ServiceContainer);

const eventResponse = {
  type: "object",
  properties: {
    response: {
      message: {
        _id: { type: "string" },
        userId: { type: "string" },
        title: { type: "string" },
        isPublic: { type: "boolean" },
        geolocation: { type: "string" },
        address: { type: "string" },
        startTime: { type: "string" },
        endTime: { type: "string" },
        attendants: { type: "string" },
        visibility: { type: "string" },
        passcode: { type: "string" },
      },
    },
  },
};

const createEventOpts = {
  schema: {
    body: {
      type: "object",
      required: [
        "userId",
        "title",
        "isPublic",
        "geolocation",
        "address",
        "startTime",
        "endTime",
      ],
      properties: {
        userId: { type: "string" },
        title: { type: "string" },
        isPublic: { type: "string" },
        passcode: { type: "string" },
        geolocation: { type: "string" },
        address: { type: "string" },
        startTime: { type: "string" },
        endTime: { type: "string" },
        visibility: { type: "string" },
        attendants: { type: "string" },
      },
    },
    response: {
      201: eventResponse,
    },
  },
  handler: (req, res) => EventControllerHandler.createEvent(req, res),
};

module.exports = { createEventOpts };
