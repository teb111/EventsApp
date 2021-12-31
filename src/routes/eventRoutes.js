const ServiceContainer = require("../services");
const EventController = require("../controllers/eventController");
const EventControllerHandler = EventController(ServiceContainer);
const protect = require("../middleware/authMiddleware");
const {
  createEventOpts,
  joinEventOpts,
  addImageOpts,
} = require("../options/EventOptions");

function eventRoutes(fastify, options, done) {
  // create an event
  fastify.post(
    "/api/event/new",
    { schema: createEventOpts, preHandler: protect },
    (req, res) => EventControllerHandler.createEvent(req, res)
  );

  // Join an event
  fastify.post(
    "/api/event/:id/join",
    { schema: joinEventOpts, preHandler: protect },
    (req, res) => EventControllerHandler.joinEvent(req, res)
  );

  // post a picture to an event
  fastify.post(
    "/api/event/:id/addImage",
    { schema: addImageOpts, preHandler: protect },
    (req, res) => EventControllerHandler.addImage(req, res)
  );

  // comment on an Image an event
  fastify.post(
    "/api/event/:id/:imageId/comment",
    { preHandler: protect },
    (req, res) => EventControllerHandler.commentImage(req, res)
  );

  // get image in an event with it's comment
  fastify.get("/api/event/:id/:imageId", { preHandler: protect }, (req, res) =>
    EventControllerHandler.getImage(req, res)
  );

  //get all Public events
  fastify.get("/api/event", (req, res) =>
    EventControllerHandler.getEvents(req, res)
  );

  // add Reaction to an Image
  fastify.post(
    "/api/event/:id/:imageId/react",
    { preHandler: protect },
    (req, res) => EventControllerHandler.addReaction(req, res)
  );

  done();
}

module.exports = eventRoutes;
