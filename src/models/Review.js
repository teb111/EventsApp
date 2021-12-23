const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Image",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    Rating: { type: Number, required: true },
    EventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Event",
    },
    status: { type: String, required: true, default: "active" },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
