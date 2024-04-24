// TopNavigationBar.js

import { Navbar } from '@material-tailwind/react';
import { useState } from 'react';
import { FaAccusoft, FaBars, FaStumbleupon, FaTimes } from 'react-icons/fa';

const TopNavigationBar = ({ toggleSidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    toggleSidebar();
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Navbar className="max-w-full text-white flex justify-between items-center shadow-md border border-white/80 rounded-none">
      <button
        onClick={handleToggleSidebar}
        className="text-black focus:outline-none w-10 h-10 p-2 rounded-md hover:bg-gray-300 transition-colors"
      >
        {isSidebarOpen ? <FaBars size={20} /> : <FaTimes size={20} />}
      </button>
      <div className="text-black text-2xl font-bold">Admin</div>
    </Navbar>
  );
};

export default TopNavigationBar;
