import React, { useState, useEffect } from 'react';
import "../styles/updateForm"

const UpdateJobForm = ({ jobId, onUpdate }) => {
  const [updatedJob, setUpdatedJob] = useState({
    title: '',
    company: '',
    location: '',
    seniority: '',
    description: '',
  });

  useEffect(() => {
    // Fetch the existing job details and populate the form
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/getJobDetails/${jobId}`);
        if (response.ok) {
          const jobDetails = await response.json();
          setUpdatedJob(jobDetails); // Assuming the API returns job details
        } else {
          console.error('Error fetching job details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJob((prevJob) => ({ ...prevJob, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/updateJobPosting/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJob),
      });

      if (response.ok) {
        console.log('Updated Job!', await response.json());
        onUpdate(); // Call a function to refresh the job postings after update
      } else {
        const errorText = await response.json();
        alert(errorText.error);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="modal">
      <h2>Update Job</h2>
      {/* Render your form fields */}
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={updatedJob.title} onChange={handleInputChange} />
      </div>
      
      {/* Add other form fields as needed */}
      <div>
        <label>Company:</label>
        <input type="text" name="company" value={updatedJob.company} onChange={handleInputChange} />
      </div>
      
      <div>
        <label>Location:</label>
        <input type="text" name="location" value={updatedJob.location} onChange={handleInputChange} />
      </div>
  
      {/* Repeat the pattern for other fields like seniority, description, etc. */}
  
      <button onClick={handleUpdate}>Update Job</button>
    </div>
  );
  
};

export default UpdateJobForm;
