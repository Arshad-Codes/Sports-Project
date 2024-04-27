import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch student profile data when the component mounts
    const fetchStudentProfile = async () => {
      try {
        // Replace 'studentId' with the actual ID of the student you want to fetch
        const studentId = 'your_student_id_here';
        const response = await axios.get(`/api/student/profile/${studentId}`);
        setStudentData(response.data);
      } catch (error) {
        setError(error.response.data);
      }
    };

    fetchStudentProfile();

    // Clean up function to cancel the request if the component unmounts
    return () => {
      // Cleanup code if needed
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Student Profile</h1>
      <div className="profile-details bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <strong>Email:</strong> {studentData.email}
        </div>
        <div className="mb-4">
          <strong>Date of Birth:</strong> {studentData.dateOfBirth}
        </div>
        <div className="mb-4">
          <strong>First Name:</strong> {studentData.firstName}
        </div>
        <div className="mb-4">
          <strong>Last Name:</strong> {studentData.lastName}
        </div>
        <div className="mb-4">
          <strong>Registration Number:</strong> {studentData.regNo}
        </div>
        <div className="mb-4">
          <strong>Achievements:</strong> {studentData.achievements}
        </div>
        <div className="mb-4">
          <strong>NIC Number:</strong> {studentData.nicNo}
        </div>
        <div className="mb-4">
          <strong>Created At:</strong> {studentData.createdAt}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
