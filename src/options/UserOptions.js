const ServiceContainer = require("../services");
const UserController = require("../controllers/userController");
const UserControllerHandler = UserController(ServiceContainer);

const userResponse = {
  type: "object",
  properties: {
    response: {
      message: {
        _id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        token: { type: "string" },
      },
    },
  },
};

// User Register Options
const userRegisterOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "email", "password", "image"],
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        image: { type: "string" },
      },
    },
    response: {
      201: userResponse,
    },
  },
  handler: (req, res) => UserControllerHandler.registerUser(req, res),
};

// User Login Options

const userLoginOpts = {
  schema: {
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    // response: {
    //   200: userResponse,
    // },
  },
  handler: (req, res) => UserControllerHandler.loginUser(req, res),
};

// get password Reset Link

const userPasswordLink = {
  schema: {
    body: {
      type: "object",
      required: ["email"],
      properties: {
        email: { type: "string" },
      },
    },
    response: {
      200: userResponse,
    },
  },

  handler: (req, res) => UserControllerHandler.getPasswordResetLink(req, res),
};

// User Reset Password options
const userResetPasswordOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        password: { type: "string" },
      },
    },
    response: {
      200: userResponse,
    },
  },

  handler: (req, res) => UserControllerHandler.resetUserPassword(req, res),
};

//add friend Options

const addFriendOpts = {
  schema: {
    body: {
      type: "object",
      required: ["email"],
      properties: { email: { type: "string" } },
    },
  },
};

// respond to friend Request options

const respondFriendOpts = {
  schema: {
    body: {
      type: "object",
      required: ["status"],
      properties: { status: { type: "string" } },
    },
  },
};

module.exports = {
  userRegisterOpts,
  userLoginOpts,
  userResetPasswordOpts,
  userPasswordLink,
  addFriendOpts,
  respondFriendOpts,
};
