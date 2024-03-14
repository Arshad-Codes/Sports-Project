import React, { useState } from 'react';
import { CustomButton } from '../TailwindCustomComponents/CustomComponents';
import { Card, Input, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminSport() {
  const [file, setFile] = useState(null);
  //   const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
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
      //navigate('/');
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
                onChange={(e) => setFile(e.target.files[0])}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            {/* {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected"
                className="mx-auto mt-4 max-w-48 h-auto"
              />
            )} */}
            <CustomButton className="mt-6" fullWidth type="submit">
              ADD
            </CustomButton>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default AdminSport;
