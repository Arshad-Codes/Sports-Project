import { useState } from 'react';
import AdminStudent from '../Admin/AdminStudent';
import EnrolledStudent from './Announcement/EnrolledStudent';
import Events from './Events';
import Common from './Announcement/Common';
import StaffTopBar from './StaffTopBar';
import StaffSideBar from './StaffSidebar';
import AddStaff from '../Admin/AdminStaff';
import AdminSport from '../Admin/AdminSport';
import AdminAnnouncement from '../Admin/AdminAnnouncement';
import EnrolledStudents from './EnrolledStudents';
import StaffAnnouncement from './StaffAnnouncement';

function StaffDashboard() {
  const [currentPage, setCurrentPage] = useState('students');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <StaffTopBar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <StaffSideBar
          isSidebarOpen={isSidebarOpen}
          onPageChange={handlePageChange}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white px-5">
          <div className="mt-10 mb-5">
            <p className="text-customGreen font-bold text-3xl pl-10 ">
              Welcome Staff!
            </p>
          </div>
          {/* {currentPage === 'staff_dashboard' && <AddStaff />} */}
          {/* {currentPage === 'sports' && <AdminSport />} */}
          {currentPage === 'students' && <AdminStudent />}
          {currentPage === 'announcement' && <StaffAnnouncement />}
          {currentPage === 'enrolled_students' && <EnrolledStudents />}
          {/* {currentPage === 'events' && <Events />} */}
          {/* {currentPage === 'enrolled_student' && <EnrolledStudent />} */}
          {/* {currentPage === 'common' && <Common />} */}
          {/* {currentPage === 'profile' && <Common />} */}
        </main>
      </div>
    </div>
  );
}

export default StaffDashboard;
