const jwt = require("jsonwebtoken");
const createError = require("../helpers/createError");

const generateToken = (id,token,expiry) =>{
  return jwt.sign( id , token?token:process.env.JWT_SECRET, {
    expiresIn: expiry?expiry:'30d',
  })
}

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if (error.name === "TokenExpiredError")
      throw createError(401, "Token is expired. Please Login");
    throw error;
  }
};

const decodeToken = (token)=>{
  return jwt.decode(token)
}

module.exports = {
    generateToken,verifyToken,decodeToken
}
