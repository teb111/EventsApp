const Attendee = require("../models/Attendee.js");
const errorResponse = require("../response/error.js");

const AttendeeRepository = () => {
  const checkAttendee = async (req, res) => {
    try {
      const attendee = await Attendee.findOne({
        userId: req.user._id,
        eventId: req.params.id,
      });
      return attendee;
    } catch (error) {
      return errorResponse(res, error);
    }
  };

  return {
    checkAttendee,
  };
};

module.exports = AttendeeRepository();
