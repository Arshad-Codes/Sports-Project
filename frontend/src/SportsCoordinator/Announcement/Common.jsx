import React, { useState } from 'react';
import NavBar from '../../components/Navbar';
import { CustomButton } from '../../TailwindCustomComponents/CustomComponents';

function Common() {
  // State to manage the form inputs
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [file, setFile] = useState(null);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here we can handle saving the announcement to your backend or wherever you need to store it
    // For simplicity, let's just log it for now
    const announcementData = {
      title,
      details,
      file,
    };
    console.log('New Announcement:', announcementData);
    // Clear the input fields after submission
    setTitle('');
    setDetails('');
    setFile(null);
  };

  return (
    <>
      <div className="container mx-auto mt-5">
        <h1 className="text-2xl font-bold mb-5">Main Announcement</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="details"
            >
              Details
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter details"
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="file"
            >
              Upload File
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <CustomButton type="submit">Add Announcement</CustomButton>
        </form>
      </div>
    </>
  );
}

export default Common;
