const router = require('express').Router();
const Note = require('../controllers/Note');

router.get('/', Note.getAll);
router.post('/add', Note.add);

module.exports = router;