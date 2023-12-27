import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cricket from './pages/SpecificSport';
import Staff from './pages/Staff';
import Sports from './pages/Sports';
import SpecificSport from './pages/SpecificSport';
import SpecificCoordinator from './pages/SpecificCoordinator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/staffs" element={<Staff />} />
        <Route path="/staffs/:position" element={<SpecificCoordinator />}/>
        <Route path="/sports" element={<Sports />} />
        <Route path="/specific" element={<SpecificSport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
