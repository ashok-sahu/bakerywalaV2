const router = require("express").Router();
const {
  registerUser,
  activateUser,
  signIn,
  forgetPassword,
  resetPassword
} = require("../../controllers/auth.controller");
const {
  validSignUp,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
  isRequestValidated,
} = require("../../validator/auth.validator");
const { setHeaders } = require("../../middlewares/headers");
const {auth} = require('../../middlewares/auth')

router.post(
  "/register",
  validSignUp,
  isRequestValidated,
  registerUser
)
.post("/active",setHeaders,activateUser)
.post("/login",setHeaders,validLogin,isRequestValidated,signIn)
.put("/forgotPassword",forgotPasswordValidator,isRequestValidated,forgetPassword)
.put("/resetPassword",resetPasswordValidator,isRequestValidated,resetPassword)

module.exports = router;
