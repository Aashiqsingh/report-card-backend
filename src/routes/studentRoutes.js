const router = require('express').Router();
const studentController = require('../controllers/studentController');
router.post('/createStudent',studentController.createStudentFromExcel);

module.exports = router;