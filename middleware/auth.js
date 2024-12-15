module.exports = function (req, res, next) {
  if (req.session && req.session.userId) {
    return next(); // User is authenticated, proceed to the next middleware/route handler
  } else {
    return res.redirect("/login.html"); // User is not authenticated, redirect to login
  }
};
