const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    contactNumber: { type: String },
    pofilePicture: { type: String },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ROLE_MEMBER", "ROLE_ADMIN", "ROLE_MERCHANT"],
      default: "ROLE_MEMBER",
    },
    salt: String,
    resetPasswordLink: {
      data: String,
      default: "",
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    address: {},
    provider: {
      type: String,
      required: true,
      default: "email",
    },
    orders: {},
    history: {
      type: Array,
      default: [],
    },
    about: {},
    googleId: {
      type: String,
      unique: true,
    },
    facebookId: {
      type: String,
      unique: true,
    },
    seller: {
      type: Boolean,
      default: false,
    },
    stripe_seller: {},
    stripe_customer: {},
    updated: Date,
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

const User = mongoose.model("User", userSchema);
module.exports = User;
