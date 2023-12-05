const mongoose = require("mongoose");

const studentMeetingSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student', // Reference to the studentModel
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    timeSlot: {
        type: String, // Assuming you want to store the meeting time as a date
        required: true,
    },
    meetingLink: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
    }
});

const studentMeetingModel = mongoose.model('studentMeeting', studentMeetingSchema);

module.exports = studentMeetingModel;