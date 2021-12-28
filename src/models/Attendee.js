const mongoose = require("mongoose");

const AttendeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Event",
    },
    mode: { type: String, required: true },
    status: { type: String, required: true, default: "active" },
  },
  {
    timestamps: true,
  }
);

const Attendee = mongoose.model("Attendee", AttendeeSchema);

module.exports = Attendee;
