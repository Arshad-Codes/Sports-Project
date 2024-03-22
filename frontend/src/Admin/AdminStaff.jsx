import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AdminStaff = () => {
  const [sportsList, setSportsList] = useState([]);
  const [user, setUser] = useState({
    email: '',
    sport: '',
    password: '',
  });
  const [error, setError] = useState('');
  //const sportsRef = useRef();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'http://localhost:8800/api/sport/getSports'
        );
        setSportsList(response.data);
        //console.log(sportsList);
      } catch (error) {
        console.error('Error fetching Sportscoordinator', error);
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
      //console.log(user);
      await axios.post(
        'http://localhost:8800/api/sportscoordinator/registercoordinator',
        user
      );
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
        <AppN />
      </div>
    </div>
  );
};

export default AdminStaff;

const coordinators = [
  {
    id: 1,
    name: 'John Doe',
    sport: 'Football',
    phone: '(555) 555-1234',
    email: 'john.doe@example.com',
  },
  {
    id: 2,
    name: 'Jane Smith',
    sport: 'Basketball',
    phone: '(555) 555-5678',
    email: 'jane.smith@example.com',
  },
  {
    id: 3,
    name: 'Michael Brown',
    sport: 'Baseball',
    phone: '(555) 555-9012',
    email: 'michael.brown@example.com',
  },
  {
    id: 4,
    name: 'Ashley Williams',
    sport: 'Volleyball',
    phone: '(555) 555-3456',
    email: 'ashley.williams@example.com',
  },
  {
    id: 5,
    name: 'David Miller',
    sport: 'Tennis',
    phone: '(555) 555-7890',
    email: 'david.miller@example.com',
  },
];

function AppN() {
  return (
    <div className="py-10 px-14 w-full border border-gray-300 border-t-0 shadow-lg rounded-lg ml-15 mb-10">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          Sports Coordinators
        </h1>
        <SearchBar />
      </div>
      <CoordinatorList coordinators={coordinators} />
      {/* Pagination component here if needed */}
    </div>
  );
}

function CoordinatorList({ coordinators }) {
  const handleEdit = (coordinator) => {
    console.log('Edit clicked for:', coordinator);
  };

  const handleDelete = (coordinator) => {
    console.log('Delete clicked for:', coordinator);
  };
  return (
    <ul className="list-disc space-y-4">
      {coordinators.map((coordinator) => (
        <CoordinatorItem
          key={coordinator.id}
          coordinator={coordinator}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

CoordinatorList.propTypes = {
  coordinators: PropTypes.array.isRequired,
};

function CoordinatorItem({ coordinator, onEdit, onDelete }) {
  return (
    <li className="flex items-center justify-between border rounded p-2">
      <div className="flex space-x-4">
        <span className="font-bold">{coordinator.name}</span>
        <span className="text-gray-500">{coordinator.sport}</span>
      </div>
      <div className="flex items-center">
        <a href={`tel:${coordinator.phone}`} className="mr-2 text-blue-500">
          {coordinator.phone}
        </a>
        <a href={`mailto:${coordinator.email}`} className="text-blue-500">
          {coordinator.email}
        </a>
        <button
          className="ml-2 px-2 py-1 rounded text-blue-500 hover:bg-blue-100"
          onClick={() => onEdit(coordinator)}
        >
          Edit
        </button>
        <button
          className="px-2 py-1 rounded text-red-500 hover:bg-red-100"
          onClick={() => onDelete(coordinator)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
CoordinatorItem.propTypes = {
  coordinator: PropTypes.object.isRequired, // Validate coordinator object
  onEdit: PropTypes.func.isRequired, // Validate onEdit function
  onDelete: PropTypes.func.isRequired, // Validate onDelete function
};

function SearchBar() {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by name or sport"
        className="border rounded px-2 py-1 w-full"
      />
    </div>
  );
}
