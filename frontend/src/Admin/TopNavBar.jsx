// TopNavigationBar.js

import { Navbar } from '@material-tailwind/react';

const TopNavigationBar = ({ toggleSidebar }) => {
  return (
    <Navbar className=" text-white p-4 flex justify-between items-center shadow-md border border-white/80">
      <button
        onClick={toggleSidebar}
        className="text-black focus:outline-none p-2 rounded-md bg-green-500 hover:bg-green-600 transition-colors"
      >
        X
      </button>
      <div className="text-black text-2xl font-bold">Admin</div>
    </Navbar>
  );
};

export default TopNavigationBar;
