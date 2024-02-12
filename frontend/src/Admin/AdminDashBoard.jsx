// AdminDashboard.js
import { useState } from 'react';
import TopNavigationBar from './TopNavBar';
import Sidebar from './SideBar';
import StaffsPage from './Staffs';
import StudentsPage from './Student';

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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-4">
          {currentPage === 'staffs' && <StaffsPage />}
          {currentPage === 'students' && <StudentsPage />}
          {/* Other pages go here, conditionally rendered based on user interaction */}
        </main>
      </div>
    </div>
  );
}

export default AdminDashBoard;
