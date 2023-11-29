import React, { useState, useEffect } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import JobTable from './JobTable';

const JobContainer = ({searchTerm}) => {
  const [jobs, setJobs] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [mode, setMode] = useState("best"); // Initialize mode state
  const [time, setTime] = useState("week");

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const fetchData = async () => {
    try { 
       const url = searchTerm
         ? `http://localhost:4000/jobPostings/${searchTerm}`
         : 'http://localhost:4000/jobPostings';
        
         console.log("url: "+url);

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
    "Title",
    "Company",
    "Location",
    "Seniority",
    "Description",
    "Action",
    "Posted Date"
  ];

  const handlePageClick = (page) => {
    setPage(page);
  };

  const handleSetLabel = (job, label) => {
    const newJobs = jobs.map((j) => {
      if (j.jobId === job.jobId) {
        j.label = label;
      }
      return j;
    });
    setJobs(newJobs);
    console.log(newJobs);
  };

    return (
      <Container padding='20px 10px'>
        {/* <Button.Group>
        <Button
          onClick={() => setMode("best")}
          active={mode === "best"}
        >
          Best
        </Button>
        <Button
          onClick={() => setMode("doubt")}
          active={mode === "doubt"}
        >
          Doubt
        </Button>
        <Button
          onClick={() => setMode("worst")}
          active={mode === "worst"}
        >
          Worst
        </Button>
      </Button.Group> */}

      <Button.Group style={{ marginLeft: "10px" }}>
        <Button
          onClick={() => setTime("week")}
          active={time === "week"}
        >
          Last Week
        </Button>
        <Button
          onClick={() => setTime("month")}
          active={time === "month"}
        >
          Last Month
        </Button>
        <Button
          onClick={() => setTime("all")}
          active={time === "all"}
        >
          All
        </Button>
      </Button.Group>

      <Link to="/jobPostingForm">
        <Button
          style={{ marginLeft: "700px", backgroundColor: "black", color: "white" }}
          onClick={() => setTime("week")}
          active={time === "week"}
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
      />
      </Container>
      
    );

}

export default JobContainer;