const jobPostingModel = require('../models/jobPostings')

const getAllJobPostings = async (req, res) => {
    try {
        const jobs = await jobPostingModel.find().sort({ likes: -1 });;
        // console.log(students);
        res.status(200).json(jobs);
    } catch(error) {
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const postJobPosting = async (req, res) => {
    const job = new jobPostingModel(req.body);
    try {
        job.likes = 0;
        await job.save();
        res.status(201).json(job);

    } catch(error) {
        console.log("Error posting data!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const getJobPosting = async (req, res) => {
    const search_str = req.params.title;
    console.log("search_str: " + req.params.title);
    try {
        const jobs = await jobPostingModel.find({ "title": { $regex: new RegExp(search_str, 'i') } });
        if(jobs) {
            console.log("Jobs Fetched successfully" + jobs);
            res.status(200).send(jobs);
        } else {
            console.log("No jobs found!!!");
            alert("No Jobs Found!!!");
        }
    } catch(error) {
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const getJobsLastWeek = async (req, res) => {
    try {
        // Calculate the date one week ago
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const jobs = await jobPostingModel.find({
            "postedDate": { $gte: oneWeekAgo }
        });

        if (jobs) {
            console.log("Jobs fetched successfully" + jobs);
            res.status(200).send(jobs);
        } else {
            console.log("No jobs found!!!");
            alert("No Jobs Found!!!");
        }
    } catch (error) {
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const getJobsLastMonth = async (req, res) => {
    try {
        // Calculate the date one week ago
        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

        const jobs = await jobPostingModel.find({
            "postedDate": { $gte: oneMonthAgo }
        });

        if (jobs) {
            console.log("Jobs fetched successfully" + jobs);
            res.status(200).send(jobs);
        } else {
            console.log("No jobs found!!!");
            alert("No Jobs Found!!!");
        }
    } catch (error) {
        console.log("Something went wrong!" + error);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

const handleLikes = async (req, res) => {
    const id = req.params.id;
    try {
        // Use findOne to get a single document by ID
        const job = await jobPostingModel.findOne({ _id: id });

        // Check if the job exists
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        job.likes = Number.isNaN(job.likes) ? 0 : job.likes;
        // Update the likes
        job.likes = job.likes + 1;

        // Save the updated document
        await job.save();
        console.log("likes: ", job.likes, typeof(job.likes));
        // Respond with the updated job
        res.status(200).json(job);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { getAllJobPostings, postJobPosting, getJobPosting, getJobsLastWeek, getJobsLastMonth, handleLikes }