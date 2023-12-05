const mongoose = require( "mongoose" );

const mentorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    workExperience: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }, 
    meetingTime: {
        type: String,
        required: true
    }
})

const mentorModel = mongoose.model('mentors', mentorSchema)
module.exports = mentorModel;