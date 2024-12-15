const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: String, required: true },
  description: { type: String },
  // Add more fields as necessary
});

module.exports = mongoose.model("Course", CourseSchema);
