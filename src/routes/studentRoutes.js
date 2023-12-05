const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const studentMeetingController = require('../controllers/meetingController');

router.get('/students', studentController.getAllStudents);
router.post('/addStudent', studentController.postStudent);
router.get('/getStudent/:emailId', studentController.getStudent);
router.post('/addstudentMeeting', studentMeetingController.poststudentMeeting);
router.get('/studentMeetings/:id', studentMeetingController.getstudentMeetings);
router.get('/deletestudentMeeting/:meetingId', studentMeetingController.deletestudentMeeting);

module.exports = router;