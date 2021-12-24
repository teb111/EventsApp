const { createEventOpts } = require("../options/EventOptions");

function eventRoutes(fastify, options, done) {
  done();

  // create an event

  fastify.post("/api/event/new", createEventOpts);

  done();
}

module.exports = eventRoutes;
