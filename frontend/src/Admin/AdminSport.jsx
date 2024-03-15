import React, { useEffect, useState } from 'react';
import { CustomButton } from '../TailwindCustomComponents/CustomComponents';
import { Card, Input, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SportsList from './Tables/SportsList';

function AdminSport() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSports() {
      try {
        const response = await axios.get(
          'http://localhost:8800/api/sport/getSports'
        );
        setSportsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sports:', error);
        setLoading(false);
      }
    }
    fetchSports();
  }, []);
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Preview the selected image
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImageUrl(imageUrl);
    } else {
      setPreviewImageUrl(null);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const upload = async (file) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'sports');

      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/djalshksm/image/upload',
          data
        );

        const { url } = res.data;
        return url;
      } catch (err) {
        console.log(err);
        // setError(err.response.data);
      }
    };

    const imgUrl = await upload(file);

    try {
      await axios.post('http://localhost:8800/api/sport/createsport', {
        ...user,
        imageUrl: imgUrl,
      });

      const response = await axios.get(
        'http://localhost:8800/api/sport/getSports'
      );
      setSportsData(response.data);
      //navigate('/');
      setUser({
        name: '',
        description: '',
        imageUrl: '',
      });
      setFile(null);
      setPreviewImageUrl(null);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-3/4 mt-10 mr-5 ml-5 mb-10">
        <Card
          className="flex border border-gray-400 w-96 p-10 mx-auto"
          color="transparent"
          shadow={true}
        >
          <Typography
            className="flex justify-center"
            variant="h4"
            color="blue-gray"
          >
            Add a Sport
          </Typography>
          <form
            className="mt-8 mb-2 w-100 max-w-screen-lg sm:w-50"
            onSubmit={handleCreate}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Name
              </Typography>
              <Input
                size="lg"
                placeholder="name of the sport"
                name="name" // Changed name to 'name'
                onChange={handleChange}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Description
              </Typography>
              <Input
                size="lg"
                placeholder="description of the sport"
                name="description"
                onChange={handleChange}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Image
              </Typography>
              <Input
                size="lg"
                name="image"
                type="file"
                onChange={handleFileChange}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            {previewImageUrl && ( // Show the preview image if available
              <img
                src={previewImageUrl}
                alt="Preview"
                className="w-32 h-32 mx-auto mt-2"
              />
            )}
            <CustomButton className="mt-6" fullWidth type="submit">
              ADD
            </CustomButton>
          </form>
        </Card>
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Sports List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {sportsData.map((sport) => (
              <div
                key={sport._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex"
              >
                <img
                  src={sport.imageUrl}
                  alt={sport.name}
                  className="w-1/3 h-auto object-cover"
                />
                <div className="p-4 w-2/3">
                  <h3 className="text-xl font-bold mb-2">{sport.name}</h3>
                  <p className="text-gray-600">{sport.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSport;