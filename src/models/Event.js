const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    isPublic: { type: Boolean, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    password: { type: String, required: true },
    geolocation: { type: String },
    address: { type: String, required: true },
    visibility: { type: String, required: true },
    attendants: { type: Number },
    status: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
