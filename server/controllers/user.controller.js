const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const passport = require("passport");
const { validationResult } = require("express-validator");

const asyncHandler = require("../middlewares/async");
const nodemailer = require("../services/nodemailer.service");
const createError = require("../helpers/createError");

const User = require("../models/user.model");

const registerUser = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  const { email, firstName, lastName, password, isSubscribed } = req.body;

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: firstError,
    });
  } else {
    await User.findOne({ email }).exec((err, user) => {
      if (user) {
        return res.status(400).json({
          error: "Email is Taken",
        });
      }
    });

    //generate a token
    const token = jwt.sign(
      {
        firstName,
        lastName,
        email,
        password,
      },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "15min" }
    );
    nodemailer
      .sendEmail(email, "signup", null, null, token)
      .then((res, err) => {
        res.redirect("/");
      })
      .catch((error) => createError(500, "verification email couldn't sent"));
  }
});

module.exports = {
  registerUser,
};
