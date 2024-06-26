import React, { useEffect } from 'react';
import './Popup.css';

const PopupEnrolled = ({ isOpen, data, onClose }) => {
  useEffect(() => {
    if (data) {
        console.log(data);
    }
  }, [data]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg w-2/3 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Announcements</h3>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
        {data.length > 0 ? (
          data.map((announcement, index) => (
            <div className="announcement mb-4" key={index}>
              <div className="announcement-content">
                <h1 className="text-lg font-semibold">{announcement.heading}</h1>
                <p className="date text-sm text-gray-500">Posted on: {new Date(announcement.date).toLocaleString()}</p>
                <p>{announcement.details}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No announcements for this sport.</p>
        )}
      </div>
    </div>
  );
};

export default PopupEnrolled;