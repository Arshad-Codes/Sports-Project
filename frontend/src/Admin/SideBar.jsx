// Sidebar.js
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserGraduate,
  FaSignOutAlt,
  FaFutbol,
  FaUserAlt,
  FaRegCalendar,
  FaUserEdit,
} from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';

const Sidebar = ({ isSidebarOpen, onPageChange }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState('sports');
  const handlePageClick = (page) => {
    onPageChange(page);
    setClickedButton(page);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8800/api/admin/logout',
        {withCredentials:true}
      );
      if (res.status === 200) {
        localStorage.removeItem('currentUser');
        navigate('/login',{state:{role:'Admin'}});
      }
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <nav
      className={`bg-white text-gray-700 w-64 min-h-screen border-r-2  ${
        isSidebarOpen ? '' : 'hidden'
      }`}
    >
      <div className="flex flex-row h-20">
        <div className="w-20 flex items-center justify-center">
          <p className="h-14 w-14 bg-blue-gray-600 rounded-lg"></p>
        </div>
        <div className="flex flex-col mt-3">
          <p className="ml-5 text-2xl font-extrabold text-customGreen">Admin</p>
          <p className="ml-5 text-base font-bold text-customGreen">Dashboard</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 ml-3 mt-5 mr-5">
        {/* <button
          className={`rounded-lg h-10 p-3 flex flex-row gap-5 items-center ${
            clickedButton === 'admin_dashboard'
              ? 'bg-customGreen text-white'
              : 'hover:bg-customGreen hover:text-white'
          }`}
          onClick={() => handlePageClick('admin_dashboard')}
        >
          <FaTachometerAlt size={25} />
          Dashboard
        </button> */}
        <button
          className={`rounded-lg h-10 p-3 flex flex-row gap-5 items-center ${
            clickedButton === 'sports'
              ? 'bg-customGreen text-white'
              : 'hover:bg-customGreen hover:text-white'
          }`}
          onClick={() => handlePageClick('sports')}
        >
          <FaFutbol size={25} />
          Sports
        </button>
        <button
          className={`rounded-lg h-10 p-3 flex flex-row gap-5 items-center ${
            clickedButton === 'staffs'
              ? 'bg-customGreen text-white'
              : 'hover:bg-customGreen hover:text-white'
          }`}
          onClick={() => handlePageClick('staffs')}
        >
          <FaUserAlt size={25} />
          Sports Coordinator
        </button>
        <button
          className={`rounded-lg h-10 p-3 flex flex-row gap-5 items-center ${
            clickedButton === 'students'
              ? 'bg-customGreen text-white'
              : 'hover:bg-customGreen hover:text-white'
          }`}
          onClick={() => handlePageClick('students')}
        >
          <FaUserGraduate size={25} />
          Students
        </button>
        <button
          className={`rounded-lg h-10 p-3 flex flex-row gap-5 items-center ${
            clickedButton === 'events'
              ? 'bg-customGreen text-white'
              : 'hover:bg-customGreen hover:text-white'
          }`}
          onClick={() => handlePageClick('events')}
        >
          <FaRegCalendar size={25} />
          Events
        </button>
        <button
          className={`rounded-lg h-10 p-3 flex flex-row gap-5 items-center ${
            clickedButton === 'my_account'
              ? 'bg-customGreen text-white'
              : 'hover:bg-customGreen hover:text-white'
          }`}
          onClick={() => handlePageClick('my_account')}
        >
          <FaUserEdit size={25} />
          My Account
        </button>
        <button>
          <Link
            to="/home"
            className="rounded-lg h-10 p-3 flex flex-row gap-5 items-center hover:bg-customGreen hover:text-white"
            onClick={handleLogout}
          >
            <FaSignOutAlt size={25} />
            Logout
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
