const fastify = require("fastify")({ logger: true, maxParamLength: 500 });
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./src/config/db.js");

//load config
dotenv.config({});
// connect to Mongo
connectDB();

// api documentation
fastify.register(require("fastify-swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: { title: "Events App" },
  },
});

// routes
fastify.register(require("./src/routes/userRoutes.js"));
fastify.register(require("./src/routes/eventRoutes.js"));

const PORT = process.env.PORT;
const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
