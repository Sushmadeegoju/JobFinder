const express = require('express');
const router = express.Router();
const jobPostingController = require('../controllers/jobPostingController');

router.get('/jobPostings', jobPostingController.getAllJobPostings);
router.post('/addJobPosting', jobPostingController.postJobPosting);
router.get('/jobPostings/:title', jobPostingController.getJobPosting);

module.exports = router;