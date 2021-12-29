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
};

const joinEventOpts = {
  schema: {
    body: { type: "object", properties: { passcode: { type: "string" } } },
    response: { 201: eventResponse },
  },
};

const addImageOpts = {
  schema: {
    body: {
      type: "object",
      required: ["title", "image", "geolocation"],
      properties: {
        title: { type: "string" },
        image: { type: "string" },
        geolocation: { type: "string" },
      },
    },
  },
};

module.exports = { createEventOpts, joinEventOpts, addImageOpts };
