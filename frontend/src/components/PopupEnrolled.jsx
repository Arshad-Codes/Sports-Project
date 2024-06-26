import React, { useEffect } from 'react';
import './Popup.css';

const PopupEnrolled = ({ isOpen, data, onClose }) => {
  useEffect(() => {
    if (data && data.length > 0) {
      console.log('Announcement data:', data[0]);
      console.log('Title:', data[0].title);
    }
  }, [data]);

  if (!isOpen || !data || data.length === 0) return null;

  const announcement = data[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg w-2/3 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Announcement</h3>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
        <div className="announcement mb-4">
          <div className="announcement-content">
            <h1 className="text-lg font-semibold">{announcement.title}</h1>
            <p className="date text-sm text-gray-500">Posted on: {new Date(announcement.createdAt).toLocaleString()}</p>
            <p className="font-medium">Sport: {announcement.sport}</p>
            <p>{announcement.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupEnrolled;
