const { UserConstants, StatusConstants } = require("../constants/constants");
const Contact = require("../models/Contact");
const ResponseMsg = require("../response/message");
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 49394614e4d868651fc487a03d61eeef3f1665d9
const UserRepository = require("../repositories/userRepository");

=======

<<<<<<< HEAD
const UserRepository = require("../repositories/userRepository");


>>>>>>> 0413bd81fd810d5da16a33f68396acad2080a98e
=======
>>>>>>> 49394614e4d868651fc487a03d61eeef3f1665d9
const contactRepository = () => {
  const addFriend = async (data, friendId) => {
    try {
      // check if user userExists
      const checkRecord = await Contact.findOne({
        userId: data.userId,
        friendId,
        status: StatusConstants.STATUS_ACTIVE,
      });
      if (checkRecord) {
        const { friendStatus } = checkRecord;
        // check the friendStatus and respond accordingly
        if (
          friendStatus ===
          UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_PENDING
        ) {
          return ResponseMsg.SUCCESS.SUCCESS_FRIEND_PENDING;
        } else if (
          friendStatus ===
          UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_ACCEPTED
        ) {
          return ResponseMsg.SUCCESS.SUCCESS_FRIEND_ACCEPTED;
        } else if (
          friendStatus ===
          UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_REJECTED
        ) {
          return ResponseMsg.ERROR.ERROR_NO_FRIEND_REQUEST_SENT_REJECTED;
        } else if (
          friendStatus ===
          UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_BLOCKED
        ) {
          return ResponseMsg.ERROR.ERROR_NO_FRIEND_REQUEST_SENT_BLOCKED;
        } else {
          return checkRecord;
        }
      } else {
        const newRequest = new Contact({
          userId: data.userId,
          friendId,
          friendStatus:
            UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_PENDING,
        });

        await newRequest.save();

        return newRequest;
      }
    } catch (error) {
<<<<<<< HEAD
      throw (error);
=======
      throw new Error(error);
>>>>>>> 0413bd81fd810d5da16a33f68396acad2080a98e
    }
  };

  const friendRequestRespond = async (data, friendId) => {
    try {
      // change the user friendStatus to either accepted or rejected
      const getSenderRequest = await Contact.findOne({
        userId: friendId,
        friendId: data.userId,
        status: StatusConstants.STATUS_ACTIVE,
      });

      if (getSenderRequest) {
        if (
          getSenderRequest.friendStatus ===
          UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_PENDING
        ) {
          getSenderRequest.friendStatus = data.status;
          await getSenderRequest.save();
        } else if (
          getSenderRequest.friendStatus ===
          UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_ACCEPTED
        ) {
          return ResponseMsg.SUCCESS.SUCCESS_FRIEND_ACCEPTED;
        } else if (
          getSenderRequest.friendStatus ===
          UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_BLOCKED
        ) {
          return ResponseMsg.ERROR.ERROR_NO_FRIEND_REQUEST_SENT_BLOCKED;
        } else if (
          getSenderRequest.friendStatus ===
          UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_REJECTED
        ) {
          return ResponseMsg.ERROR.ERROR_NO_FRIEND_REQUEST_SENT_REJECTED;
        } else {
          return getSenderRequest;
        }
      }

      // create a new record for the user responding with respective to the response

      const getReceiverRequest = await Contact.findOne({
        userId: data.userId,
        friendId,
        status: StatusConstants.STATUS_ACTIVE,
      });

      if (getReceiverRequest) {
        if (
          getReceiverRequest.friendStatus ===
          UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_PENDING
        ) {
          getReceiverRequest.friendStatus = data.status;
          await getReceiverRequest.save();
        } else if (
          getReceiverRequest.friendStatus ===
          UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_ACCEPTED
        ) {
          return ResponseMsg.SUCCESS.SUCCESS_FRIEND_ACCEPTED;
        } else if (
          getReceiverRequest.friendStatus ===
          UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_BLOCKED
        ) {
          return ResponseMsg.ERROR.ERROR_NO_FRIEND_REQUEST_SENT_BLOCKED;
        } else if (
          getReceiverRequest.friendStatus ===
          UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_REJECTED
        ) {
          return ResponseMsg.ERROR.ERROR_NO_FRIEND_REQUEST_SENT_REJECTED;
        }
      } else {
        const newFriend = new Contact({
          userId: data.userId,
          friendId,
          friendStatus:
            UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_ACCEPTED,
        });

        await newFriend.save();
        return newFriend;
      }
    } catch (error) {
<<<<<<< HEAD
      throw (error);
    }
  };

=======
      throw new Error(error);
    }
  };


<<<<<<< HEAD
>>>>>>> 0413bd81fd810d5da16a33f68396acad2080a98e
=======
>>>>>>> 49394614e4d868651fc487a03d61eeef3f1665d9
  const allContacts = async (data) => {
    try {
      let friends = [];
      if (
        data.status ===
        UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_ACCEPTED
      ) {
        const result = await Contact.find({
          userId: data.userId,
          status: StatusConstants.STATUS_ACTIVE,
          friendStatus:
            UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_ACCEPTED,
        }).populate("friendId", "name email image");

        friends.push(...result);

        return friends;
      } else if (
        data.status ===
        UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_REJECTED
      ) {
        const result = await Contact.find({
          userId: data.userId,
          status: StatusConstants.STATUS_ACTIVE,
          friendStatus:
            UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_REJECTED,
        }).populate("friendId", "name email image");

        friends.push(...result);

        return friends;
      } else if (
        data.status ===
        UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_BLOCKED
      ) {
        const result = await Contact.find({
          userId: data.userId,
          status: StatusConstants.STATUS_ACTIVE,
          friendStatus:
            UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_BLOCKED,
        }).populate("friendId", "name email image");

        friends.push(...result);

        return friends;
      } else {
        return friends;
      }
    } catch (error) {
<<<<<<< HEAD
      throw (error);
=======
      throw new Error(error);
>>>>>>> 0413bd81fd810d5da16a33f68396acad2080a98e
    }
  };

  const allFriendRequests = async (userId) => {
    try {
      let friends = [];
      const result = await Contact.find({
        userId,
        status: StatusConstants.STATUS_ACTIVE,
        friendStatus:
          UserConstants.FRIEND_REQUEST_CONSTANTS.FRIEND_STATUS_PENDING,
      }).populate("friendId", "name email image");

      friends.push(...result);

      return friends;
    } catch (error) {
<<<<<<< HEAD
      throw (error);
=======
      throw new Error(error);
>>>>>>> 0413bd81fd810d5da16a33f68396acad2080a98e
    }
  };

  return {
    addFriend,
    friendRequestRespond,
    allContacts,
    allFriendRequests,
<<<<<<< HEAD
<<<<<<< HEAD
  };
=======

>>>>>>> 0413bd81fd810d5da16a33f68396acad2080a98e
=======

>>>>>>> 49394614e4d868651fc487a03d61eeef3f1665d9
};

module.exports = contactRepository();
