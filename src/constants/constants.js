const UserConstants = {
  FRIEND_REQUEST_CONSTANTS: {
    FRIEND_STATUS_PENDING: "pending",
    FRIEND_STATUS_ACCEPTED: "accepted",
    FRIEND_STATUS_REJECTED: "rejected",
    FRIEND_STATUS_BLOCKED: "blocked",
  },
};

const StatusConstants = {
  STATUS_ACTIVE: "active",
  STATUS_DELETED: "deleted",
  STATUS_SUSPENDED: "suspended",
};

const PublicConstants = {
  PUBLIC_TRUE: "true",
  PUBLIC_FALSE: "false",
};

module.exports = { UserConstants, StatusConstants, PublicConstants };
