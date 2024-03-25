import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cricket from './pages/SpecificSport';
import Staff from './pages/Staff';
import Sports from './pages/Sports';
import SpecificSport from './pages/SpecificSport';
import EnrolledPage from './pages/EnrolledPage';
import AdminDashBoard from './Admin/AdminDashBoard';
import AdminLogin from './Admin/AdminLogin';
import SpecificCoordinator from './pages/SpecificCoordinator';
import StaffLogin from './SportsCoordinator/StaffLogin';
import StaffDashboard from './SportsCoordinator/StaffDashboard';

import Achievement from './Achievementss/Achievement';
function App() {
  return (
    <BrowserRouter>
      <Routes scrollToTop={() => ({ x: 0, y: 0 })}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/staffs" element={<Staff />} />
        <Route path="/staffs/:position" element={<SpecificCoordinator />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/specific" element={<SpecificSport />} />
        <Route path="/enrolled" element={<EnrolledPage />} />
        {/* <Route path="/admin" element={<AdminLogin />} /> */}
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
        <Route path="/staff" element={<StaffLogin />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/achievement" element={<Achievement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
