const mongoose = require("mongoose");

const ReactionSchema = new mongoose.Schema(
  {
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Image",
    },

    like: { type: Number },
    dislike: { type: Number },
    status: { type: String, required: true, default: "active" },
  },
  {
    timestamps: true,
  }
);

const Reaction = mongoose.model("Reaction", ReactionSchema);

module.exports = Reaction;
