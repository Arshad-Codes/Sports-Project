import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserGraduate,
  FaSignOutAlt,
  FaTachometerAlt,
  FaFutbol,
  FaUserAlt,
  FaRegCalendar,
  FaUserEdit,
  FaBullhorn,
} from 'react-icons/fa';
import { useState } from 'react';

const StaffSidebar = ({ isSidebarOpen, onPageChange }) => {
  const [clickedButton, setClickedButton] = useState('students');
  const navigate = useNavigate();
  const [showAnnouncementButtons, setShowAnnouncementButtons] = useState(false);
  const handlePageClick = (page) => {
    onPageChange(page);
    setClickedButton(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    //localStorage.removeItem('token');
    navigate('/');
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
          onClick={() => handlePageClick('staff_dashboard')}
        >
          <FaTachometerAlt size={25} />
          Dashboard
        </button> */}
        {/* <button
          className={`rounded-lg h-10 p-3 flex flex-row gap-5 items-center ${
            clickedButton === 'sports'
              ? 'bg-customGreen text-white'
              : 'hover:bg-customGreen hover:text-white'
          }`}
          onClick={() => handlePageClick('sports')}
        >
          <FaFutbol size={25} />
          Sports
        </button> */}
        {/* <button
          className={`rounded-lg h-10 p-3 mb-3 flex flex-row gap-5 items-center ${
            clickedButton === 'announcement'
              ? 'bg-customGreen text-white'
              : 'hover:bg-customGreen hover:text-white'
          }`}
          onClick={() => setShowAnnouncementButtons(!showAnnouncementButtons)}
        >
          <FaBullhorn size={25} />
          Announcement
        </button> */}
        {showAnnouncementButtons && (
          <>
            {/* Enrolled Students button */}
            <button
              className={`rounded-lg h-10 ml-10 pl-4 mb-1 flex flex-row items-center ${
                clickedButton === 'enrolled_students'
                  ? 'bg-customGreen text-white'
                  : 'hover:bg-customGreen hover:text-white'
              }`}
              onClick={() => handlePageClick('enrolled_student')}
            >
              Enrolled Students
            </button>

            {/* Main Announcement button */}
            <button
              className={`rounded-lg h-10 ml-10 pl-4 mb-1 flex flex-row items-center ${
                clickedButton === 'main_announcement'
                  ? 'bg-customGreen text-white'
                  : 'hover:bg-customGreen hover:text-white'
              }`}
              onClick={() => handlePageClick('common')}
            >
              Common
            </button>
          </>
        )}
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
            clickedButton === 'announcement'
              ? 'bg-customGreen text-white'
              : 'hover:bg-customGreen hover:text-white'
          }`}
          onClick={() => handlePageClick('announcement')}
        >
          <FaRegCalendar size={25} />
          Announcement
        </button>
        <button
          className={`rounded-lg h-10 p-3 flex flex-row gap-5 items-center ${
            clickedButton === 'enrolled_students'
              ? 'bg-customGreen text-white'
              : 'hover:bg-customGreen hover:text-white'
          }`}
          onClick={() => handlePageClick('enrolled_students')}
        >
          <FaUserEdit size={25} />
          Enrolled Students
        </button>
        <button>
          <Link
            to="/"
            onClick={handleLogout}
            className="rounded-lg h-10 p-3 flex flex-row gap-5 items-center hover:bg-customGreen hover:text-white"
          >
            <FaSignOutAlt size={25} />
            Logout
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default StaffSidebar;
