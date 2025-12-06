const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  },
  verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  },
};
