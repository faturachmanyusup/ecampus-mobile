const router = require('express').Router();
const User = require('../controllers/User.js');

router.post('/login', User.login);
router.post('/register', User.register);

module.exports = router;