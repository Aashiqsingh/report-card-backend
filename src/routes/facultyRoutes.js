const router = require('express').Router();
const facultyController = require('../controllers/facultyController');

router.post('/faculty',facultyController.addFaculty);
router.post('/login',facultyController.loginFaculty)

module.exports = router