import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import "fomantic-ui-css/semantic.css";
import HeaderSegmentLayout from './HeaderSegmentLayout';
import Mentor from './mentorTable';
import Login from './login';
import Register from './register';
import JobContainer from './JobContainer';
import JobPosting from './JobPosting';
import '../styles/App.css';
import Dashboard from './Dashboard';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

function App() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => { 
    setAnchorEl(null);
      switch (option) {
        case 'My Dashboard':
            navigate('/dashboard');
            break;
        case 'View Jobs':
          navigate('/jobs'); // Adjust the route as needed
          break;
        case 'View Mentors':
          navigate('/mentors'); // Adjust the route as needed
          break;
        case 'Logout':
          handleLogout();
          console.log("Logged out");
          navigate('/login');
          break;
        default:
          break;
      }
  };

  const [options, setOptions] = useState(() => { return ['My Dashboard', 'View Companies', 'Logout'] });
   
  const storedLoggedInState = localStorage.getItem('isLoggedIn');
  const [isLoggedIn, setIsLoggedIn] = useState(storedLoggedInState === 'true');

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setOptions(['My Dashboard', 'View Companies', 'Logout']);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  useEffect(() => {
    // Fetch the designation and other user details
    if (window.location.pathname === '/') {
      // If it is, set isLoggedIn to false
      setIsLoggedIn(false);
      localStorage.setItem('isLoggedIn', 'false');
    }
  },[]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };
  return (
    <div>
      <header>
        <div style={{ color: "white", fontWeight: "bold" }}>JobFinder</div>
        <nav>
        {isLoggedIn? (
            <div style={{ backgroundColor: "black" }}>
            <IconButton
              class = "three_dots"
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon style={{ color: "white", marginTop: "6px"}}/>
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleClose('')}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                }, 
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleClose(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>

          ):<ul>
              <li
                style={{ marginRight: "5px", color: "white", fontWeight: "bold" }}
              >
                <Link to="/login"> Login |</Link>
              </li>
              <li style={{ fontWeight: "bold" }}>
                <Link to="/register"> Register</Link>
              </li>
          </ul>
          }
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
            <Login onLogin={handleLogin} />
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
        <Route path="/dashboard" element={<Dashboard/>}/>
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
    </div>
  );
};

export default App;
