const router = require("express").Router();
const {
  registerUser,
  activateUser,
  signIn
} = require("../../controllers/auth.controller");
const {
  validSignUp,
  validLogin,
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

module.exports = router;
