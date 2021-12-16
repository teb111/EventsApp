const mongoose = require("mongoose");

const ReactionSchema = new mongoose.Schema(
  {
    imageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Image",
    },

    like: { type: Number, required: true },
    dislike: { type: Number, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Reaction = mongoose.model("Reaction", ReactionSchema);

module.exports = Reaction;
