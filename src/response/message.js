const ResponseMsg = {
  ERROR: {
    ERROR_MISSING_FIELD: "Please fill all required fields",
    ERROR_WENT_WRONG: "Something went wrong",
    ERROR_BODY_CONTENT: "Properties missing, Please check body content",
    ERROR_EVENT_ACCESS_DENIED: "Sorry, You do not have access to the event",
    ERROR_EVENT_INACTIVE: "This Event is no longer active",
    ERROR_EVENT_SAME_TITLE:
      "Event with the same title already exists, Please choose a different title",
    ERROR_IN_EVENT: "You are already in this event",
    ERROR_NO_EVENT: "Sorry this event does not exist anymmore",
    ERROR_INVALID_EMAIL: "Invalid Email Format",
    ERROR_INVALID_PASSWORD: "Password can not be less than 6 characters",
    ERROR_INVALID_NAME: "Name can not be less than 3 characters",
    ERROR_INCORRECT_PASSCODE: "Incorrect Passcode",
    ERROR_NO_USER: "No user Found",
    ERROR_INVALID_LOGIN_CREDENTIALS: "Check Login Credentials and Try Again",
    ERROR_USER_EXISTS: "User already exists",
  },
  SUCCESS: {
    SUCCESS_PASSWORD_RESET_LINK:
      "A link has been sent to your Email to continue resetting your password",
    SUCCESS_PASSWORD_CHANGED:
      "Password was changed successfully, Please Log in",
  },
};

module.exports = ResponseMsg;
