const { UserConstants } = require("../constants/constants");
const Contact = require("../models/Contact");
const ResponseMsg = require("../response/message");

const contactRepository = () => {
  const addFriend = async (data, friendId) => {
    try {
      // check if user userExists
      const checkRecord = await Contact.findOne({
        userId: data.userId,
        friendId,
        status: "active",
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
          friendStatus: "pending",
        });

        await newRequest.save();

        return newRequest;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const friendRequestRespond = async (data, friendId) => {
    try {
      // change the user friendStatus to either accepted or rejected
      const getSenderRequest = await Contact.findOne({
        userId: friendId,
        friendId: data.userId,
        status: "active",
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
        status: "active",
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
          friendStatus: "accepted",
        });

        await newFriend.save();
        return newFriend;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    addFriend,
    friendRequestRespond,
  };
};

module.exports = contactRepository();
