const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: String, required: true, default: "active" },
  },
  {
    timestamps: true,
  }
);

// creating a function to compare the user entered password with the one in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// so this function here  will run before we save anything to our database , basically we are just hashing our password with bcrypt
UserSchema.pre("save", async function (next) {
  // this will check if the password field has been modified, if not we do not want to hash the password
  // cause we don't want to hash the password on PUT requests to modify for example the user's name only
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
