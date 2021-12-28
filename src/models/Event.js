const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const EventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    isPublic: { type: Boolean, required: true },
    geolocation: { type: String, required: true },
    address: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    attendants: { type: Number },
    passcode: { type: String },
    status: { type: String, required: true, default: "active" },
  },
  {
    timestamps: true,
  }
);

// creating a function to compare the user entered password with the one in the database
EventSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passcode);
};

// so this function here  will run before we save anything to our database , basically we are just hashing our password with bcrypt
EventSchema.pre("save", async function (next) {
  // this will check if the password field has been modified, if not we do not want to hash the password
  // cause we don't want to hash the password on PUT requests to modify for example the user's name only
  if (!this.isModified("passcode")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.passcode = await bcrypt.hash(this.passcode, salt);
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
