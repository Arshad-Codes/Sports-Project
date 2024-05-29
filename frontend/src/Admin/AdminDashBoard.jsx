import { useState, useEffect } from 'react';
import TopNavigationBar from './TopNavBar';
import Sidebar from './SideBar';
import AddStaff from './AdminStaff';
import StudentsPage from './AdminStudent';
import AdminSport from './AdminSport';
import MyAccount from './MyAccount';
import { useNavigate } from 'react-router-dom';
import AdminAnnouncement from './AdminAnnouncement';
import AdminApprove from './AdminApprove';

function AdminDashBoard() {
  const [currentPage, setCurrentPage] = useState('sports');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      // Redirect to login if user data is not found in localStorage
      navigate('/login', { state: { role: 'Admin' } });
    } else {
      const user = JSON.parse(currentUser);
      if (user.role !== 'admin') {
        // Redirect to unauthorized page if user is not an admin
        navigate('/');
      }
    }
  }, []);
  return (
    <div className="flex flex-col h-screen bg-white">
      <TopNavigationBar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onPageChange={handlePageChange}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white px-5 mt-10">
          {currentPage === 'admin_dashboard' && <AddStaff />}
          {currentPage === 'sports' && <AdminSport />}
          {currentPage === 'staffs' && <AddStaff />}
          {currentPage === 'students' && <StudentsPage />}
          {currentPage === 'announcement' && <AdminAnnouncement />}
          {currentPage === 'my_account' && <MyAccount />}
          {currentPage === 'adminapprove'  && <AdminApprove/>}
        </main>
      </div>
    </div>
  );
}

export default AdminDashBoard;
