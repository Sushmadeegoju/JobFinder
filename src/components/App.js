import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "fomantic-ui-css/semantic.css";
import HeaderSegmentLayout from './HeaderSegmentLayout';
import Mentor from './mentorTable';
import Login from './login';
import Register from './register';
import JobContainer from './JobContainer';
import JobPosting from './JobPosting';
import '../styles/App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };
  return (
    <Router>
      <header>
        <div style={{ color: "white", fontWeight: "bold" }}>JobFinder</div>
        <nav>
          <ul>
            {/* <li>
              <Link to="/">Home</Link>
            </li> */}
            {/* <li>
              <Link to="/mentors">Mentors</Link>
            </li>
            <li style={{ marginRight: "40px" }}>
              <Link to="/fairs">Fairs</Link>
            </li> */}
            <li
              style={{ marginRight: "5px", color: "white", fontWeight: "bold" }}
            >
              <Link to="/login"> Login |</Link>
            </li>
            <li style={{ fontWeight: "bold" }}>
              <Link to="/register"> Register</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Login />
          }
        />
        <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route path="/mentors" element={
            <>
              <HeaderSegmentLayout />
              <Mentor />
            </>
          } 
        />
        <Route path="/jobs" element={
            <>
              <HeaderSegmentLayout onSearchTermChange={handleSearchTermChange}/>
              <JobContainer searchTerm={searchTerm}/>
            </>
          } 
        />

        <Route path="/register" element={
              <Register />
          } 
        />
        <Route path="/jobPostingForm" element={
              <JobPosting />
          } 
        />

        {/* Add more routes for other pages if needed */}
      </Routes>

      <footer>
        <section>
          <p> &copy; 2023 JobFinder, Inc</p>
        </section>

        <section>
          <p> About | Directions | Contact Us</p>
        </section>

        <section>
          <p> Privacy Policy </p>
        </section>
      </footer>
    </Router>
  );
};

export default App;
