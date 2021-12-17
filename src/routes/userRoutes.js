const ServiceContainer = require("../services");
const UserController = require("../controllers/userController");
const UserControllerHandler = UserController(ServiceContainer);

function userRoutes(fastify, options, done) {
  // get all Users
  fastify.post("/api/user/register", (req, res) => {
    UserControllerHandler.registerUser(req, res);
  });

  done();
}

module.exports = userRoutes;
