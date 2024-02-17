// AdminDashboard.js
import { useState } from 'react';
import TopNavigationBar from './TopNavBar';
import Sidebar from './SideBar';
import AddStaff from './AdminStaff';
import StudentsPage from './AdminStudent';
import Home from '../pages/Home';

function AdminDashBoard() {
  const [currentPage, setCurrentPage] = useState('staffs');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopNavigationBar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onPageChange={handlePageChange}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white px-5">
          <div className="mt-10 mb-5">
            <p className="text-customGreen font-bold text-3xl pl-10 ">
              Welcome Admin!
            </p>
          </div>
          {currentPage === 'admin_dashboard' && <AddStaff />}
          {currentPage === 'sports' && <StudentsPage />}
          {currentPage === 'staffs' && <AddStaff />}
          {currentPage === 'students' && <StudentsPage />}
        </main>
      </div>
    </div>
  );
}

export default AdminDashBoard;
