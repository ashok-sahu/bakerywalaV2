const {errorHandler}= require("./error");
const {verifyToken} = require("../utils/jwt");
const asyncHandler = require("../middlewares/async");
const User = require("../models/user.model");

const auth = asyncHandler(async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!(authorization && authorization.toLowerCase().startsWith("Bearer")))
    throw errorHandler(401, "Not authorized");
  const token = authorization.split(" ")[1];
  const decodeToken = verifyToken(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodeToken._id);
  next();
});

module.exports = {
  auth,
};
