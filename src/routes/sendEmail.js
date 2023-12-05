const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

//------------ email service code ------
// Email transport configuration
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kirandot1976@gmail.com',
        pass: 'pomspuhscwqunbzt'
    }
});

// POST endpoint for sending emails
router.post('/send-email', (req, res) => {
    const { meetingDetails, recruiterName, companyName } = req.body;
    const userName = "Sushma Deegoju";
    const userEmail = 'sushmad@vt.edu'
    const zoomMeetingLink = "https://zoom.us/j/your-zoom-meeting-id";
    const mailJobSeeker = {
        from: 'kirandot1976@gmail.com',
        to: userEmail,
        subject: 'JobFinder Meeting Confirmation',
        text: `Dear ${userName},\n\nYour meeting is scheduled on ${meetingDetails} with ${recruiterName} from ${companyName}.\n\nPlease join the meeting using the link below:\n link: ${zoomMeetingLink}\n\nLooking forward to meet you!\n\nRegards,\n${recruiterName}`
    };

    transporter.sendMail(mailJobSeeker, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error in sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });

    const mailRecruiter = {
        from: 'kirandot1976@gmail.com',
        to: 'vivekj@vt.edu',
        subject: 'JobFinder Meeting Confirmation',
        text: `Dear ${recruiterName},\n\nYour meeting is scheduled on ${meetingDetails} with ${userName}.\n\nPlease join the meeting using the link below:\nLink: ${zoomMeetingLink}\n\nLooking forward to meet you!\n\nRegards,\n${userName}`
    };

    transporter.sendMail(mailRecruiter, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error in sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

module.exports = router;