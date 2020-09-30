const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  encrypt: (data) => {
    return jwt.sign(data, jwtSecret);
  },
  decrypt: (token) => {
    return jwt.verify(token, jwtSecret);
  }
}
