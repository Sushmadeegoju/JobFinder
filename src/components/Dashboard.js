import React, { useState } from 'react';
import './Dashboard.css';

const availableTimeSlots = [
    { id: 1, time: '10:00 AM - 11:00 AM', mentor: 'Ritwik Sood', booked: false },
    { id: 2, time: '1:00 PM - 2:00 PM', mentor: 'Shail Shah', booked: false },
    { id: 3, time: '1:00 PM - 2:00 PM', mentor: 'Vivek Joshi', booked: false },
    { id: 4, time: '1:00 PM - 2:00 PM', mentor: 'Sushma Degoju', booked: false },
    // Add more time slots as needed
];

const Dashboard = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showMyAccountDropdown, setShowMyAccountDropdown] = useState(false);

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
    };

    const handleBookMeeting = () => {
        if (selectedSlot) {
            alert(`Meeting booked with ${selectedSlot.mentor} at ${selectedSlot.time}`);
            // Update the state or send a request to update the backend
            // to mark the slot as booked.
        } else {
            alert('Please select a meeting slot before booking.');
        }
    };

    const handleMyAccountDropdownToggle = () => {
        setShowMyAccountDropdown(!showMyAccountDropdown);
    };

    return (
        <>
            <div className="navigation-bar">

                <div className="navigation-bar-right">
                    <div className="my-account-dropdown">
                        <button onClick={handleMyAccountDropdownToggle}>My Account</button>
                        {showMyAccountDropdown && (
                            <ul className="my-account-dropdown-options">
                                <li>
                                    <a href="#">Logout</a>
                                </li>
                                <li>
                                    <a href="/dashboard">Dashboard</a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <div className="dashboard-h1">
                <h1>Student Dashboard</h1>
                <div className="time-slots">
                    {availableTimeSlots.map((slot) => (
                        <div
                            key={slot.id}
                            className={`time-slot ${slot.booked ? 'booked' : ''} ${
                                selectedSlot === slot ? 'selected' : ''
                            }`}
                            onClick={() => handleSlotClick(slot)}
                        >
                            <p>{slot.time}</p>
                            <p>Mentor: {slot.mentor}</p>
                            {slot.booked ? <p>Booked</p> : <p>Available</p>}
                        </div>
                    ))}
                </div>
                <div className="booking-actions">
                    <button onClick={handleBookMeeting} disabled={!selectedSlot}>
                        Book Meeting
                    </button>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

