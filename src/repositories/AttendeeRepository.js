const Attendee = require("../models/Attendee.js");

const AttendeeRepository = () => {
  const checkAttendee = async (data) => {
    try {
      const attendee = await Attendee.findOne({
        userId: data.userId,
        eventId: data.eventId,
      });
      return attendee;
    } catch (error) {
      throw (error);
    }
  };

  return {
    checkAttendee,
  };
};

module.exports = AttendeeRepository();
