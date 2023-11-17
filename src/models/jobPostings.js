const mongoose = require('mongoose');

const jobPostingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    seniority: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    action: {
        type: String,
    },
    postedDate: {
        type: Date,
        required: true
    }
});

const jobPostingModel = mongoose.model("jobPostings", jobPostingSchema);
module.exports = jobPostingModel;