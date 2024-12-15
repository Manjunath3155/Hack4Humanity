const express = require("express");
const router = express.Router();
const path = require("path");
const {getCourses} = require("../models/Courses");


router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/courses/index1.html"));
});

router.get("/data", (req, res) => {
  res.json(getCourses());
});

module.exports = router;



