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

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 0413bd81fd810d5da16a33f68396acad2080a98e
=======

>>>>>>> 49394614e4d868651fc487a03d61eeef3f1665d9
  // get User Contacts/friends
  fastify.get(
    "/api/user/contacts/:status",
    { preHandler: protect },
    (req, res) => UserControllerHandler.getContacts(req, res)
  );

  // get all friend Requests
  fastify.get("/api/user/requests", { preHandler: protect }, (req, res) =>
    UserControllerHandler.friendRequests(req, res)
  );
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 0413bd81fd810d5da16a33f68396acad2080a98e
=======

>>>>>>> 49394614e4d868651fc487a03d61eeef3f1665d9

  done();
}

module.exports = userRoutes;
