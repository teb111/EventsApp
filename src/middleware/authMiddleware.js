const errorResponse = require("../response/error.js");
const jwt = require("jsonwebtoken"); // to handle any unHandled promise rejection warnings
const User = require("../models/User.js");
const { StatusConstants } = require("../constants/constants.js");

const protect = async (req, reply, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({
        _id: decoded.id,
        status: StatusConstants.STATUS_ACTIVE,
      }).select("-password");
    } catch (err) {
      errorResponse(reply, "Not Authorized token failed, Please Log in Again");
    }
  }
};

module.exports = protect;
