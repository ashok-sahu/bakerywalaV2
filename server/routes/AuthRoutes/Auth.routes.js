const router = require("express").Router();
const { registerUser } = require("../../controllers/user.controller");
const { validateUserRegister } = require("../../validator/auth.validator");

router.post("/register", validateUserRegister, registerUser);

module.exports = router;
