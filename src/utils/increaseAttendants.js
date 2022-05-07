const Event = require("../models/Event")

const increaseAttendants = async (eventId) => {
    const event = await Event.findOne({ _id: eventId });

    if (event) {
        event.attendants = Number(event.attendants) + 1;

    }

    await event.save();
}

module.exports = increaseAttendants