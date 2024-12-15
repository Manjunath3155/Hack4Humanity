const express = require("express");
const router = express.Router();
const { getJobs } = require("../models/Jobs");
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/jobs/index.html"));
});


router.get("/data", paginatedResults(getJobs()), (req, res) => {
  res.json(res.paginatedResults);
});

// router.get("/data", (req, res) => {
//   res.json(getJobs());
  
// });



function paginatedResults(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    results.totalJobs = model.length;

    
    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = model.slice(startIndex, endIndex);
res.paginatedResults= results
next()
  };
}














module.exports = router;
