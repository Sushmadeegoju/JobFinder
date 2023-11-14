const express = require('express');
const server = express();
require("./db/mongoose");
const port = 4000;
const loginRoute = require('./routes/loginRoutes');
const jobPostingRoute = require('./routes/jobPostingRoutes');
const mentorRoute = require('./routes/mentorRoutes');
const studentRoute = require('./routes/studentRoutes');

server.use(express.json());
console.log("entered");
server.use(loginRoute);
server.use(jobPostingRoute);
server.use(mentorRoute);
server.use(studentRoute);

server.listen(port, () => {
    console.log("Server started listening!!!");
})

server.get('/api', (req, res) => {
    // Handle your API routes here
    res.send('API is working');
});