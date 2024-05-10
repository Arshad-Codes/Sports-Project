import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomButton } from '../TailwindCustomComponents/CustomComponents';

function AdminAnnouncement() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sport, setSport] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const response = await axios.get(
          'http://localhost:8800/api/announcement/getAnnouncement'
        );
        setAnnouncements(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, [announcements]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    else if (name === 'content') setContent(value);
    else if (name === 'sport') setSport(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8800/api/announcement/createAnnouncement',
        {
          title,
          content,
          sport,
        }
      );
      // Clear input fields after submission
      setTitle('');
      setContent('');
      setSport('');
      // Fetch announcements again to update the list
      const response = await axios.get(
        'http://localhost:8800/api/announcement/getAnnouncement'
      );
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Announcement</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="sport" className="block text-gray-700">
            Sport
          </label>
          <input
            type="text"
            id="sport"
            name="sport"
            value={sport}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <CustomButton type="submit">Create Announcement</CustomButton>
      </form>

      <h2 className="text-2xl font-bold mb-4">Announcements List</h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex h-auto"
            >
              <div className="p-4 w-full">
                <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
                <p className="text-gray-600">{announcement.content}</p>
                <p className="text-gray-600">Sport: {announcement.sport}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminAnnouncement;
