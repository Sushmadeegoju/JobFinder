import React ,{ useState, useEffect } from 'react';
import '../styles/mentor.css';
import { Container, Button } from "semantic-ui-react";
import axios from 'axios';

const Mentor = ({id}) => {
  const [mentors, setMentors] = useState([]);
  
  useEffect(() => {
    // Fetch mentor data from the API
    fetch('http://localhost:4000/mentors')
      .then((response) => response.json())
      .then((data) => setMentors(data))
      .catch((error) => console.error('Error fetching mentors:', error));
  }, []);

  console.log(mentors);
  const [showPopup, setShowPopup] = useState(false);

  const handleAppointmentClick = (user) => {
    setShowPopup(true);
    
    // Define emailData with the necessary information
    const emailData = {
        meetingDetails: user.meetingTime,
        recruiterName: user.firstName + " " + user.lastName,
        companyName: user.company
    };

    // Axios POST request to send the email
    axios.post('http://localhost:4000/send-email',emailData)
        .then(response => {
            console.log('Email sent successfully:', response.data);
            // Handle success - maybe update the state to show a success message
        })
        .catch(error => {
            console.error('Error in sending email:', error);
            // Handle error - maybe update the state to show an error message
        });

      const meetingData = {
        timeSlot: user.meetingTime,
        firstName: user.firstName,
        lastName: user.lastName,
        meetingLink: 'https://zoom.us/j/your-zoom-meeting-id',
        email: `${user.firstName}${user.lastName}@${user.company}.com`,
        company: user.company,
        student: id
      }
      
      axios.post('http://localhost:4000/addstudentMeeting',meetingData)
        .then(response => {
          console.log('Added Data successfully!', response.data);
        })
        .catch(error => {
          console.log('Error Adding data: ', error);
        });

    setTimeout(() => {
        setShowPopup(false);
    }, 2000); // Hide popup after 2 seconds
};



  return (
    <Container>
      <div className="mentor-details">
      <h2>Mentors</h2>
      <table className="mentors-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Designation</th>
            <th>Company</th>
            <th>Experience</th>
            <th>Meeting Time</th>
            {/* Add more table headers for additional details if needed */}
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor, index) => (
            <tr key={index}>
              <td>{mentor.firstName}</td>
              <td>{mentor.lastName}</td>
              <td>{mentor.designation}</td>
              <td>{mentor.company}</td>
              <td>{mentor.workExperience}</td><td>
                  <Button onClick={() => {handleAppointmentClick(mentor)}}>{mentor.meetingTime}</Button> {/* Display the meeting time as a button */}
                  {showPopup && (
                          <span className="popup">
                            ✔ Your meeting is scheduled.
                          </span>
                        )}               
                </td>

              {/* Add more table data (td) for additional details if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Container>
    
  );
};

export default Mentor;
