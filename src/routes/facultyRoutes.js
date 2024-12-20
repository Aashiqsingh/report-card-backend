const router = require('express').Router();
const facultyController = require('../controllers/facultyController');

router.post('/faculty',facultyController.addFaculty);
router.post('/login',facultyController.loginFaculty);
router.get('/protected',facultyController.getUserFromToken);

module.exports = router