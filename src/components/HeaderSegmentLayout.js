import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const HeaderSegmentLayout = ({ onSearchTermChange }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Perform any additional search-related logic here
      onSearchTermChange(searchTerm);
      navigate(`/jobs?search=${encodeURIComponent(searchTerm)}`);
    }
    
  };

  // Assuming searchTerm and onSearchTermChange are defined in your component's state or props

  // const handleViewJobs = () => {
  //   setSearchTerm('');
  //   onSearchTermChange(''); // Assuming onSearchTermChange accepts a parameter
  // }


  return (
    <div style={{ padding: '15px 150px' }}>
      <Segment inverted style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/jobs">
          <Button>
            View Jobs
          </Button>
        </Link>
        <div className="searchBarContainer">
          <input
            className="searchBarInput"
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
        <Link to="/mentors">
          <Button>
            View Mentors
          </Button>
        </Link>
      </Segment>
    </div>
      
  );
};

export default HeaderSegmentLayout;
