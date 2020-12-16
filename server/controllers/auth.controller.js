const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const passport = require("passport");

const { generateToken, verifyToken, decodeToken } = require("../utils/jwt");
const { errorHandler } = require("../helpers/dbErrorHandling");
const asyncHandler = require("../middlewares/async");
const nodemailer = require("../services/nodemailer.service");

const User = require("../models/user.model");

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  // check exit user
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({
      error: "user is already exists",
    });
  }
  //generate token
  const token = generateToken({ name, email, password });
  await nodemailer.sendEmail(email, "signup", null, null, token).then(() => {
    res.status(200).send({
      status: "success",
      message: "Account Activation Link Sent To Your Mail",
    });
  });
});

const activateUser = asyncHandler(async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    res.status(400).json({
      error: "User Not Authorized",
    });
  } else {
    const token = authorization.split(" ")[1];
    const tokenVerify = verifyToken(token, process.env.JWT_SECRET);

    try {
      if (tokenVerify) {
        const { name, email, password } = decodeToken(token);
        const newUser = new User({
          name,
          email,
          password,
        });
        await newUser.save((err, user) => {
          if (err) {
            return res.status(401).json({
              error: errorHandler(err),
            });
          } else {
            return res.status(200).json({
              success: true,
              data: user,
              message: "Signup success",
            });
          }
        });
      }
    } catch (err) {
      return res.status(400).json({
        error: `Here is error: ${err}`,
      });
    }
  }
});

const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  await User.findOne({ email }).exec(async (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: err,
        message: "User Not Found",
      });
    } else if (!user.authenticate(password)) {
      res.status(400).json({
        error: "User Email And password Not Matching",
      });
    } else {
      //generate a token
      const token = generateToken({ _id: user._id });
      const { _id, name, email, role } = user;

      await nodemailer
        .sendEmail(email, "loginSuccess", null, name, token)
        .then(() => {
          res.status(200).send({
            token,
            user: {
              _id,
              name,
              email,
              role,
            },
          });
        });
    }
  });
});

const forgetPassword = asyncHandler(async (req, res, next) => {});

const resetPassword = asyncHandler(async (req, res, next) => {});

const googleAuth = asyncHandler(async (req, res, next) => {});

const facebookAuth = asyncHandler(async (req, res, next) => {});

const otpSend = asyncHandler(async (req, res, next) => {});

const verifyOtp = asyncHandler(async (req, res, next) => {});

module.exports = {
  registerUser,
  activateUser,
  signIn,
  resetPassword,
  forgetPassword,
  googleAuth,
  facebookAuth,
  otpSend,
  verifyOtp,
};
