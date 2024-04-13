import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AdminStaff = () => {
  const [sportsList, setSportsList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [user, setUser] = useState({
    email: '',
    sport: '',
    password: '',
    fullName: '',
    position: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  //const sportsRef = useRef();
  useEffect(() => {
    async function fetchData() {
      try {
        const Sportsresponse = await axios.get(
          'http://localhost:8800/api/sport/getSports'
        );
        const Staffsresponse = await axios.get(
          'http://localhost:8800/api/sportscoordinator/getcoordinators'
        );
        setSportsList(Sportsresponse.data);
        setStaffList(Staffsresponse.data);
        setLoading(false);
        //console.log(sportsList);
      } catch (error) {
        console.error('Error fetching Sportscoordinator', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function handleChange(e) {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const selectedSport = sportsList.find(
        (sport1) => sport1._id === user.sport
      );
      if (!selectedSport) {
        setError('Please select a valid sport.');
        return;
      }

      const userData = {
        ...user,
        sport: selectedSport.name, // Send the name of the sport instead of its ID
      };

      await axios.post(
        'http://localhost:8800/api/sportscoordinator/registercoordinator',
        userData,
        { withCredentials: true }
      );

      // Clear form fields after successful submission
      setUser({
        email: '',
        sport: '',
        password: '',
        fullName: '',
        position: '',
      });

      setError(''); // Clear any previous errors
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-start min-h-screen min-w-full bg-white mt-3 px-10">
        <div className="py-10 px-14 w-full border border-gray-300 border-t-0 shadow-lg rounded-lg ml-15 mb-10">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-black">
              Add a Sports Coordinator
            </h1>
          </div>
          <form className="space-y-5" onSubmit={handleCreate}>
            <div className="shadow-sm">
              <label className="sr-only">Username</label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                id="email"
                placeholder="Email"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-1 focus:outline-gray-600"
              />
            </div>
            <div className="shadow-sm">
              <label className="sr-only">Full Name</label>
              <input
                type="text"
                name="fullName"
                onChange={handleChange}
                id="fullName"
                placeholder="Enter the full name"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-1 focus:outline-gray-600"
              />
            </div>
            <div className="shadow-sm">
              <label className="sr-only">Position</label>
              <input
                type="text"
                name="position"
                onChange={handleChange}
                id="position"
                placeholder="Enter the Position"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-1 focus:outline-gray-600"
              />
            </div>

            <div className="shadow-sm">
              <label className="sr-only">Sports</label>
              <select
                //ref={sportsRef}
                name="sport"
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-1 focus:outline-gray-600"
              >
                <option value="">Select Sport</option>
                {sportsList.map((sport) => (
                  <option key={sport._id} value={sport._id}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="shadow-sm">
              <label className="sr-only">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                id="password"
                placeholder="Password"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-1 focus:outline-gray-600"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="group relative w-36 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-3xl text-white bg-customGreen hover:shadow-2xl focus:bg-gray-600 focus:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                ADD
              </button>
            </div>
          </form>
        </div>
        {/* <AppN /> */}
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Sports Coordinators List</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {staffList.map((staff) => (
              <div
                key={staff._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex h-72"
              >
                <img
                  src={staff.imageUrl}
                  alt={staff.name}
                  className="w-1/3 h-auto object-cover"
                />
                <div className="p-4 w-2/3">
                  <h3 className="text-xl font-bold mb-2">{staff.fullName}</h3>
                  <p className="text-gray-600">{staff.position}</p>
                  <p className="text-gray-600">{staff.email}</p>
                  <p className="text-gray-600">{staff.sport}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStaff;
