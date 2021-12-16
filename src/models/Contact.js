const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    friendStatus: { type: String, required: true, default: "pending" },

    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
