const ServiceContainer = require("../services");
const EventController = require("../controllers/eventController");
const EventControllerHandler = EventController(ServiceContainer);
const protect = require("../middleware/authMiddleware");
const { createEventOpts, joinEventOpts } = require("../options/EventOptions");

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

  done();
}

module.exports = eventRoutes;
