import { Card, Input, Typography, Textarea } from '@material-tailwind/react';
import axios from 'axios';
import { useState } from 'react';
import { CustomButton } from '../TailwindCustomComponents/CustomComponents';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    regNo: '',
    email: '',
    gender: 'Male',
    password: '',
    imageUrl: '',
    dateofBirth: '',
    nicNo: '',
    achievements: '',
  });
  const [error, setError] = useState('');
  console.log(user.gender);
  const navigate = useNavigate();
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  function handleChange(e) {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

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
  const handleButtonClick = (role) => {
    navigate('/login', { state: { role } });
  };

  async function handleRegister(e) {
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
      await axios
        .post('http://localhost:8800/api/student/register', {
          ...user,
          imageUrl: imgUrl,
        })
        .then((res) => {
          if (res.status === 200) {
            alert('Registration Successful! Please verify your email.');
            navigate('/login');
          }
        });
    } catch (err) {
      setError(err.response.data);
      console.log(err.response.data);
    }
  }
  return (
    <div>
      <div>
        <button
          type="button"
          className=" text-black px-10 py-5 hover:text-blue-700 hover:scale-105 transition-transform"
          onClick={() => (window.location.href = '/home')}
        >
          <div className="flex flex-row align-middle">
            <svg
              className="w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="ml-1">Home</p>
          </div>
        </button>
      </div>
      <div className="flex items-center justify-center  h-3/4 mt-5 mr-5 ml-5 mb-5">
        <Card
          className="flex border border-gray-400 p-10 mx-auto"
          color="transparent"
          shadow={true}
        >
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your valid details to register.
          </Typography>
          <form
            className="mt-8 mb-2 w-100 max-w-screen-lg sm:w-96"
            onSubmit={handleRegister}
          >
            <div className="mb-1 flex flex-col gap-6">
              {previewImageUrl && ( // Show the preview image if available
                <img
                  src={previewImageUrl}
                  alt="Preview"
                  className="w-32 h-32 mx-auto mt-2 rounded-full"
                />
              )}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Image
              </Typography>
              <Input
                size="lg"
                name="image"
                type="file"
                onChange={handleFileChange}
                value={user.imageUrl}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                First Name
              </Typography>
              <Input
                size="lg"
                onChange={handleChange}
                name="firstName"
                placeholder="First Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Last Name
              </Typography>
              <Input
                size="lg"
                placeholder="Last Name"
                onChange={handleChange}
                name="lastName"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Registration Number
              </Typography>
              <Input
                size="lg"
                onChange={handleChange}
                name="regNo"
                placeholder="EG/YYYY/XXXX"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Student Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@engug.ruh.ac.lk"
                onChange={handleChange}
                name="email"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Gender
              </Typography>
              <select
                name="gender"
                onChange={handleChange}
                value={user.gender}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder-gray-500 text-gray-900 focus:outline-1 focus:outline-gray-600"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {/* <Input
                size="lg"
                placeholder="Gender"
                onChange={handleChange}
                name="gender"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              /> */}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                onChange={handleChange}
                name="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Date of Birth
              </Typography>
              <Input
                size="lg"
                placeholder="MM/DD/YYYY"
                type="date"
                onChange={handleChange}
                name="dateofBirth"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                NIC Number
              </Typography>
              <Input
                size="lg"
                onChange={handleChange}
                name="nicNo"
                placeholder="XXXXXXXXXX or XXXXXXXXXV"
                type="text"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                Achievements
              </Typography>
              <Textarea
                size="lg"
                onChange={handleChange}
                name="achievements"
                placeholder="You can mention your sports achievements here."
                type="text"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              /> */}
            </div>
            <CustomButton className="mt-6" fullWidth type="submit">
              sign up
            </CustomButton>
            {/* {error && <Typography color="red">{error}</Typography>} */}
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{' '}
              <button
                onClick={() => handleButtonClick('Student')}
                className="font-medium text-gray-900"
              >
                Log In
              </button>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
