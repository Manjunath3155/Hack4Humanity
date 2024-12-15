const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    theme: { type: String, default: "light" },
    fontSize: { type: String, default: "medium" },
  },
});

module.exports = mongoose.model("User", UserSchema);
