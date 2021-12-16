function userRoutes(fastify, options, done) {
  // get all Users
  fastify.get("/api/user", (req, res) => {
    console.log("All users");
  });

  done();
}

module.exports = userRoutes;
