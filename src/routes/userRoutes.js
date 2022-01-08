const ServiceContainer = require("../services");
const UserController = require("../controllers/userController");
const UserControllerHandler = UserController(ServiceContainer);
const protect = require("../middleware/authMiddleware");
const {
  userRegisterOpts,
  userLoginOpts,
  userResetPasswordOpts,
  userPasswordLink,
  addFriendOpts,
  respondFriendOpts,
} = require("../options/UserOptions");

function userRoutes(fastify, options, done) {
  // User Register
  fastify.post("/api/user/register", userRegisterOpts);
  // User Login
  fastify.post("/api/user/login", userLoginOpts);
  // get Password Reset Link
  fastify.post("/api/user/passwordLink", userPasswordLink);
  // reset password
  fastify.put("/api/user/:token/:id/resetPassword", userResetPasswordOpts);
  // Friend Request
  fastify.post(
    "/api/user/add",
    { schema: addFriendOpts, preHandler: protect },
    (req, res) => UserControllerHandler.addFriend(req, res)
  );

  // accept or reject friend request
  fastify.post(
    "/api/user/respond",
    { schema: respondFriendOpts, preHandler: protect },
    (req, res) => UserControllerHandler.respondFriend(req, res)
  );

  done();
}

module.exports = userRoutes;
