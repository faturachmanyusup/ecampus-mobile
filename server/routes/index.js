const router = require('express').Router();
const usersRoutes = require('./users');
const notesRoutes = require('./notes');
const { authentication } = require('../middlewares/auth');
const Home = require('../controllers/Home');

router.use('/users', usersRoutes);

router.use(authentication);
router.get('/', Home.get);
router.use('/notes', notesRoutes);

module.exports = router;