const { userRegisterOpts, userLoginOpts } = require("../options/UserOptions");

function userRoutes(fastify, options, done) {
  // User Register
  fastify.post("/api/user/register", userRegisterOpts);
  // User Login
  fastify.post("/api/user/login", userLoginOpts);

  done();
}

module.exports = userRoutes;
