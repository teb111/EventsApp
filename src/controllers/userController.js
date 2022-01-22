const errorResponse = require("../response/error");
const ResponseMsg = require("../response/message");
const successResponse = require("../response/success");
const { isEmpty } = require("../utils/validator");

const userController = (serviceContainer) => {
  const registerUser = async (req, res) => {
    try {
      if (
        typeof req.body !== null &&
        req.body.hasOwnProperty("name") &&
        req.body.hasOwnProperty("email") &&
        req.body.hasOwnProperty("password")
      ) {
        const { name, email, password, image } = req.body;
        if (
          isEmpty(name) ||
          isEmpty(email) ||
          isEmpty(password) ||
          isEmpty(image)
        ) {
          return errorResponse(res, ResponseMsg.ERROR.ERROR_MISSING_FIELD, 400);
        } else {
          const result = await serviceContainer.userService.addUser(
            name,
            email,
            password,
            image
          );
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, ResponseMsg.ERROR.ERROR_BODY_CONTENT, 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const loginUser = async (req, res) => {
    try {
      if (
        typeof req.body !== null &&
        req.body.hasOwnProperty("email") &&
        req.body.hasOwnProperty("password")
      ) {
        const { email, password } = req.body;
        if (isEmpty(email) || isEmpty(password)) {
          return errorResponse(res, Response.ERROR.ERROR_MISSING_FIELD, 400);
        } else {
          const result = await serviceContainer.userService.authUser(
            email,
            password
          );
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, ResponseMsg.ERROR.ERROR_BODY_CONTENT, 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const getPasswordResetLink = async (req, res) => {
    try {
      if (typeof req.body !== null && req.body.hasOwnProperty("email")) {
        const { email } = req.body;
        if (isEmpty(email)) {
          return errorResponse(res, Response.ERROR.ERROR_MISSING_FIELD, 400);
        } else {
          const result = await serviceContainer.userService.passwordResetLink(
            email
          );
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, ResponseMsg.ERROR.ERROR_BODY_CONTENT, 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const resetUserPassword = async (req, res) => {
    const data = { userId: req.params.id, userToken: req.params.token };

    try {
      if (typeof req.body !== null && req.body.hasOwnProperty("password")) {
        const { password } = req.body;
        if (
          isEmpty(password) ||
          isEmpty(data.userId) ||
          isEmpty(data.userToken)
        ) {
          return errorResponse(res, Response.ERROR.ERROR_MISSING_FIELD, 400);
        } else {
          const result = await serviceContainer.userService.resetPassword(
            password,
            data
          );
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, ResponseMsg.ERROR.ERROR_BODY_CONTENT, 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const addFriend = async (req, res) => {
    try {
      if (typeof req.body !== null && req.body.hasOwnProperty("email")) {
        const data = {
          email: req.body.email,
          userId: req.user._id,
        };
        if (isEmpty(data.email)) {
          return errorResponse(res, Response.ERROR.ERROR_MISSING_FIELD, 400);
        } else {
          const result = await serviceContainer.userService.sendFriendRequest(
            data
          );
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, ResponseMsg.ERROR.ERROR_BODY_CONTENT, 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const respondFriend = async (req, res) => {
    try {
      if (typeof req.body !== null && req.body.hasOwnProperty("status")) {
        const data = {
          userId: req.user._id,
          email: req.body.email,
          status: req.body.status,
        };
        if (isEmpty(data.email) || isEmpty(data.status)) {
          return errorResponse(res, Response.ERROR.ERROR_MISSING_FIELD, 400);
        } else {
          const result = await serviceContainer.userService.requestRespond(
            data
          );
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, ResponseMsg.ERROR.ERROR_BODY_CONTENT, 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const getContacts = async (req, res) => {
    try {
      if (req.user._id && req.params.status) {
        if (isEmpty(req.params.status)) {
          return errorResponse(res, Response.ERROR.ERROR_MISSING_FIELD, 400);
        } else {
          const data = { userId: req.user._id, status: req.params.status };
          const result = await serviceContainer.userService.fetchContacts(data);
          return successResponse(res, result);
        }
      } else {
        return errorResponse(res, ResponseMsg.ERROR.ERROR_BODY_CONTENT, 400);
      }
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  const friendRequests = async (req, res) => {
    try {
      const userId = req.user._id;
      const result = await serviceContainer.userService.getFriendRequests(
        userId
      );
      return successResponse(res, result);
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    registerUser,
    loginUser,
    getPasswordResetLink,
    resetUserPassword,
    addFriend,
    respondFriend,

    getContacts,
    friendRequests,

  };
};

module.exports = userController;
