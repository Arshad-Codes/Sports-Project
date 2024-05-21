import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-500 p-4 mt-10">
      <div className="container mx-auto text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/" className="text-gray-900 hover:text-customGreen">
            Home
          </a>
          <a href="/sports" className="text-gray-900 hover:text-customGreen">
            Sports
          </a>
          <a href="/staff" className="text-gray-900 hover:text-customGreen">
            Staff
          </a>
          {/* Add other buttons here */}
        </div>
        <p className="text-gray-900 mt-4">
          &copy; {new Date().getFullYear()} RuhunaSports. All rights reserved.
        </p>
        <p className="text-gray-900">Ruhuna University, Matara, Sri Lanka.</p>
      </div>
    </footer>
  );
};

export default Footer;
