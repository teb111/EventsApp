const {
  userRegisterOpts,
  userLoginOpts,
  userResetPasswordOpts,
  userPasswordLink,
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

  done();
}

module.exports = userRoutes;
