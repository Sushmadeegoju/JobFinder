import React, { useState, useEffect } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import JobTable from './JobTable';

const JobContainer = ({ searchTerm, id }) => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);

  const handleLikesUpdated = async () => {
    try {
      // Fetch updated job data or whatever logic you need
      await fetchData('http://localhost:4000/jobPostings/');

      // Trigger a re-render by setting the state or using any other mechanism
      
      // Refresh the page
      console.log("Page will reload");
      window.location.reload();
  } catch (error) {
      console.error("Error in handleLikesUpdated:", error);
  }

  };

  useEffect(() => {
    fetchData('http://localhost:4000/jobPostings/');
  }, [searchTerm]);

  const fetchData = async (url) => {
    try {
      if (searchTerm) {
        url = `http://localhost:4000/jobPostings/${searchTerm}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      setJobs(result);
      console.log('Jobs ', result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const header = [
    'Title',
    'Company',
    'Location',
    'Seniority',
    'Description',
    'Posted Date',
    'Like',
    'Delete'
  ];

  const handlePageClick = (page) => {
    setPage(page);
  };

  const handleWeek = async () => {
    const url = 'http://localhost:4000/jobsLastWeek';
    await fetchData(url);
  };

  const handleMonth = async () => {
    const url = 'http://localhost:4000/jobsLastMonth';
    await fetchData(url);
  };

  const handleAll = async () => {
    const url = 'http://localhost:4000/jobPostings';
    await fetchData(url);
  };

  const handleSetLabel = (job, label) => {
    const newJobs = jobs.map((j) => {
      if (j.jobId === job.jobId) {
        j.label = label;
      }
      return j;
    });
    setJobs(newJobs);
    // console.log(newJobs);
  };

  return (
    <Container padding="20px 10px" style={{ overflow: 'auto', marginBottom: '20px'}}>
      <Button.Group style={{ marginLeft: '10px' }}>
        <Button onClick={handleWeek}>Last Week</Button>
        <Button onClick={handleMonth}>Last Month</Button>
        <Button onClick={handleAll}>All</Button>
      </Button.Group>

      <Link to="/jobPostingForm">
        <Button
          style={{
            marginLeft: '700px',
            backgroundColor: 'black',
            color: 'white',
          }}
        >
          Add a Job
        </Button>
      </Link>

      <JobTable
        header={header}
        rows={jobs}
        onPageClick={handlePageClick}
        onSetLabel={handleSetLabel}
        numPages={parseInt(jobs.length / 15)}
        page={page}
        onLikesUpdated={handleLikesUpdated}
        userId={id}
      />
    </Container>
  );
};

export default JobContainer;
