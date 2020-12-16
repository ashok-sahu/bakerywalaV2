const jwt = require("jsonwebtoken");
const createError = require("../helpers/createError");

const generateToken = (id) =>{
  return jwt.sign( id , process.env.JWT_SECRET, {
    expiresIn: '30d',
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
