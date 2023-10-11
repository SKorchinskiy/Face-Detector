const jwt = require("jsonwebtoken");

function userInterpolation(req, res, next) {
  const token = req.signedCookies.Authentication;
  const user = jwt.decode(token);
  req.user = user;
  next();
}

module.exports = {
  userInterpolation,
};
