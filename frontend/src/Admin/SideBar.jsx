// Sidebar.js
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSignOutAlt,
} from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, onPageChange }) => {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <nav
      className={`bg-white text-white w-64 min-h-screen border shadow-md ${
        isSidebarOpen ? '' : 'hidden'
      }`}
    >
      {/* Buttons located above the sidebar */}
      <div className="p-4">
        <button
          className="flex items-center w-50 hover:bg-green-200 text-gray-700 rounded focus:outline-none mb-4"
          onClick={() => handlePageClick('staffs')}
        >
          <FaChalkboardTeacher className="mr-2" size={20} />
          Staff
        </button>
        <button
          className="flex w-50 items-center hover:bg-green-200 text-gray-700 rounded focus:outline-none"
          onClick={() => handlePageClick('students')}
        >
          <FaUserGraduate className="mr-2" size={20} />
          Student
        </button>
      </div>
      {/* Sidebar content, including buttons for staff, student, logout */}
      <button
        className="flex items-center py-3 px-6 bg-blue-300 hover:bg-green-200 text-gray-700 rounded focus:outline-none"
        onClick={() => handlePageClick('logout')}
      >
        <FaSignOutAlt className="mr-2" size={20} />
        Logout
      </button>
    </nav>
  );
};

export default Sidebar;
