const validateEmail = require("../mails/validateMail.js");
const UserRepository = require("../repositories/userRepository.js");
const ContactRepository = require("../repositories/ContactRepository.js");
const jwt = require("jsonwebtoken");
const util = require("util");
const ResponseMsg = require("../response/message.js");
const jwtVerifyAsync = util.promisify(jwt.verify);

const userService = () => {
  const addUser = async (name, email, password, image) => {
    try {
      if (!validateEmail(email)) {
        throw new Error(ResponseMsg.ERROR.ERROR_INVALID_EMAIL);
      } else if (password.length < 6) {
        throw new Error(ResponseMsg.ERROR.ERROR_INVALID_PASSWORD);
      } else if (name.length < 3) {
        throw new Error(ResponseMsg.ERROR.ERROR_INVALID_NAME);
      } else {
        const user = await UserRepository.createUser(
          name,
          email,
          password,
          image
        );
        return user;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const authUser = async (email, password) => {
    try {
      const result = await UserRepository.userLogin(email, password);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  const passwordResetLink = async (email) => {
    try {
      if (!validateEmail(email)) {
        throw new Error(ResponseMsg.Error.ERROR_INVALID_EMAIL);
      }
      const result = await UserRepository.sendPasswordLink(email);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };

  const resetPassword = async (password, data) => {
    try {
      const checkToken = await jwtVerifyAsync(
        data.userToken,
        process.env.JWT_SECRET
      );
      if (checkToken) {
        const result = await UserRepository.passwordReset(password, data);
        return result;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const sendFriendRequest = async (data) => {
    try {
      // get friendId
      const friend = await UserRepository.getUserId(data.email);
      if (friend) {
        const friendData = {
          friendId: friend._id,
        };

        const result = await ContactRepository.addFriend(
          data,
          friendData.friendId
        );
        return result;
      } else {
        throw new Error(ResponseMsg.ERROR.ERROR_NO_USER);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const requestRespond = async (data) => {
    try {
      // get friendId
      const friend = await UserRepository.getUserId(data.email);
      if (friend) {
        const friendData = {
          friendId: friend._id,
        };

        const result = await ContactRepository.friendRequestRespond(
          data,
          friendData.friendId
        );
        return result;
      } else {
        throw new Error(ResponseMsg.ERROR.ERROR_NO_USER);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    addUser,
    authUser,
    passwordResetLink,
    resetPassword,
    sendFriendRequest,
    requestRespond,
  };
};

module.exports = userService;
