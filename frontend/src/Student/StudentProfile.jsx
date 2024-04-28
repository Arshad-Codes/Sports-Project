import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    return <div>Loading...</div>;
  }

    // Function to format the date
   const Dateformat = (dateString) => {
      const date = new Date(dateString);
      // Extract the date components (year, month, day)
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      // Return the formatted date string (YYYY-MM-DD)
      return `${year}-${month}-${day}`;
    };

  //no design at all
  return (
    <div className="profile-container bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Student Name</h1>
      {/* <img class="block mx-auto h-40 rounded-full sm:mx-0 sm:shrink-0" 
      src="https://kumartrade.com/wp-content/uploads/2024/01/dadf7517032563.562b4c0cf0c1c.png" 
      alt="Man's Face" /> */}
      <div className="profile-details bg-white shadow-md rounded-lg p-6">
      <img class="block mx-auto h-40 rounded-full sm:mx-0 sm:shrink-0" 
      src="https://kumartrade.com/wp-content/uploads/2024/01/dadf7517032563.562b4c0cf0c1c.png" 
      alt="Man's Face" />
      <div className="mb-4 text-lg">
          <strong>First Name:</strong> {currentUser.firstName}
        </div>
        <div className="mb-4">
          <strong>Last Name:</strong> {currentUser.lastName}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {currentUser.email}
        </div>
        <div className="mb-4">
          <strong>Date of Birth:</strong> {Dateformat(currentUser.dateofBirth)}
        </div>
        <div className="mb-4">
          <strong>Registration Number:</strong> {currentUser.regNo}
        </div>
        <div className="mb-4">
          <strong>Achievements:</strong> {currentUser.achievements}
        </div>
        <div className="mb-4">
          <strong>NIC Number:</strong> {currentUser.nicNo}
        </div>
        <div className="mb-4">
          <strong>Created At:</strong> {Dateformat(currentUser.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
