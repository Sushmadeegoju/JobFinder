const express = require('express');
const router = express.Router();
const jobPostingController = require('../controllers/jobPostingController');

router.get('/jobPostings', jobPostingController.getAllJobPostings);
router.post('/addJobPosting', jobPostingController.postJobPosting);
router.get('/jobPostings/:title', jobPostingController.getJobPosting);
router.get('/jobsLastWeek', jobPostingController.getJobsLastWeek);
router.get('/jobsLastMonth', jobPostingController.getJobsLastMonth);
router.post('/addLikes/:id', jobPostingController.handleLikes);

module.exports = router;