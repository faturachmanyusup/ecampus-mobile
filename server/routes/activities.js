const router = require('express').Router();
const Activity = require('../controllers/Activity.js');

router.get('/schedules', Activity.getSchedules());
router.get('/notes', Activity.getNotes());
router.post('/notes', Activity.addNotes());

module.exports = router;