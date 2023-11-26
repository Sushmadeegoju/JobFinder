import React, { useState } from 'react';
import './JobPosting.css';

function App() {
    const [newJob, setNewJob] = useState({
        postId: '',
        company: '',
        position: '',
        location: '',
        seniority: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob({ ...newJob, [name]: value });
    };

    const handleAddJob = () => {

        sendJSONData(newJob);
        setNewJob({
            postId: '',
            company: '',
            position: '',
            location: '',
            seniority: '',
            description: '',
        });
    };

    const sendJSONData = (data) => {
        const apiUrl = 'http://localhost:3000/addJobPosting'; // Update with your server's URL

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                // Handle the response as needed
                console.log('Response from server:', responseData);
            })
            .catch((error) => {
                console.error('Error sending data:', error);
            });
    };

    return (
        <div className="app-container">
            <h1><center>Job Posting Page</center></h1>
            <div className="form-container">
                <label htmlFor="postId"><b>Post ID:</b></label>
                <input
                    type="text"
                    id="postId"
                    name="postId"
                    value={newJob.postId}
                    onChange={handleInputChange}
                />
                <div>
                    <label htmlFor="company"><b>Company: </b></label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={newJob.company}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="position"><b>Position: </b></label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={newJob.position}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="location"><b>Location: </b></label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={newJob.location}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="seniority"><b>Seniority: </b></label>
                    <input
                        type="text"
                        id="seniority"
                        name="seniority"
                        value={newJob.seniority}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="description"><b>Description: </b></label>
                    <textarea
                        id="description"
                        name="description"
                        value={newJob.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button onClick={handleAddJob}>Add Job</button>
            </div>
        </div>
    );
}

export default App;
