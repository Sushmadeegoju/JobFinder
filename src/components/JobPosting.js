import React, { useState } from 'react';
import '../styles/JobPosting.css';
import { useNavigate } from 'react-router-dom';

function App() {
  // const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [newJob, setNewJob] = useState({
    link: '',
    title: '',
    company: '',
    location: '',
    seniority: '',
    description: '',
  });

  function getFormattedDate() {
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleAddJob = async () => {
    try {
      const dataToSend = { ...newJob, postedDate: getFormattedDate() }
      const response = await fetch("/addJobPosting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend)
      });
      if (response.ok) {
        alert(`Job posted Successfully`);
        navigate('/jobs');
      } else {
        const errorMessage = await response.json();
        alert(`Error: ${errorMessage["error"]}`);
      }
    } catch(e) {
      console.log("Cannot add Job: "+ e);
      alert("Something went wrong! Cannot Add data");
    }
  };

  return (
      <div className="jobPostingApp">
        <h1><center>Job Posting Form</center></h1>
        <div>
            <label className="jobPostingLabel"htmlFor="Link"><b>Link: </b></label>
          <input className="jobPostingInput"
              type="text"
              name="Link"
              value={newJob.Link}
              onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="jobPostingLabel"htmlFor="company"><b>Company: </b></label>
          <input className="jobPostingInput"
              type="text"
              name="company"
              value={newJob.company}
              onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="jobPostingLabel"htmlFor="title"><b>Position: </b></label>
          <input className="jobPostingInput"
              type="text"
              name="title"
              value={newJob.title}
              onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="jobPostingLabel"htmlFor="location"><b>Location: </b></label>
          <input className="jobPostingInput"
              type="text"
              name="location"
              value={newJob.location}
              onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="jobPostingLabel"htmlFor="seniority"><b>Seniority: </b></label>
          <input className="jobPostingInput"
              type="text"
              name="seniority"
              value={newJob.seniority}
              onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="jobPostingLabel" htmlFor="description"><b>Description: </b></label>
          <textarea className='jobPostingTextarea'
              id="description"
              name="description"
              value={newJob.description}
              onChange={handleInputChange}
          />
        </div>
        <button className="jobPostingButton" onClick={handleAddJob}>Add Job</button>

      </div>
  );
}

export default App;
