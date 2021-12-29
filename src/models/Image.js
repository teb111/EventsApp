const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Event",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    geolocation: { type: String, required: true },
    status: { type: String, required: true, default: "active" },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
