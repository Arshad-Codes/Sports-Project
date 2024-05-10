import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomButton } from '../TailwindCustomComponents/CustomComponents';
import { Input, Textarea, Typography } from '@material-tailwind/react';

function AdminAnnouncement() {
  const [sportsList, setSportsList] = useState([]);
  const [announcement, setAnnouncement] = useState({
    title: '',
    content: '',
    sport: '',
  });
  const [announcementsList, setAnnouncementsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'http://localhost:8800/api/announcement/getAnnouncement'
        );
        setAnnouncementsList(response.data);
        const Sportsresponse = await axios.get(
          'http://localhost:8800/api/sport/getSports'
        );
        setSportsList(Sportsresponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [announcementsList]);

  const handleChange = (e) => {
    setAnnouncement((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8800/api/announcement/createAnnouncement',
        {
          announcement,
        },
        { withCredentials: true }
      );
      //clear the fields
      setAnnouncement({
        title: '',
        content: '',
        sport: '',
      });
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-3/4 my-10 mx-5">
        <div className="py-10 px-14 w-full mx-auto border border-gray-300 border-t-0 shadow-lg rounded-lg">
          <Typography
            className="flex justify-center"
            variant="h4"
            color="blue-gray"
          >
            Create Announcement
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="mt-8 mb-2 w-100 max-w-screen-lg sm:w-50"
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Title
              </Typography>
              <Input
                size="lg"
                type="text"
                id="title"
                name="title"
                onChange={handleChange}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Content
              </Typography>
              <Textarea
                id="content"
                name="content"
                onChange={handleChange}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              ></Textarea>
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Sport
              </Typography>
              <select
                name="sport"
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder-gray-500 text-gray-900 focus:outline-1 focus:outline-gray-600"
              >
                <option value="">Select Sport</option>
                {sportsList.map((sport) => (
                  <option key={sport._id} value={sport.name}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>
            <CustomButton className="mt-6" fullWidth type="submit">
              Create Announcement
            </CustomButton>
          </form>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Announcements List</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {announcementsList.map((announcement) => (
              <div
                key={announcement._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex h-auto"
              >
                <div className="p-4 w-full">
                  <h3 className="text-xl font-bold mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-600">{announcement.content}</p>
                  <p className="text-gray-600">Sport: {announcement.sport}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAnnouncement;
