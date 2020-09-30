const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  hash: (pass) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(pass, salt);
  },
  compare: (pass, hash) => {
    return bcrypt.compareSync(pass, hash);
  }
}