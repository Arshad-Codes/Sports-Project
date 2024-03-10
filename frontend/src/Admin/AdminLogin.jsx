import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { styled } from '@mui/system';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CustomButton = styled(Button)({
  color: 'white',
  backgroundColor: '#09473F',
  variant: 'gradient',

  // '&:hover': {
  //   backgroundColor: 'green',
  // },
});
function AdminLogin() {
  const navigate = useNavigate();
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  // We should connect with the mongoDB and check the credentials.
  const handleLogin = () => {
    const username = 'admin';
    const password = 'admin123';

    if (enteredUsername === username && enteredPassword === password) {
      navigate('/admin/dashboard');
    } else {
      console.log('Invalid credentials');
    }
  };

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
      <div className="flex items-center justify-center h-3/4 mt-10 mr-5 ml-5 mb-10">
        <Card
          className="flex border border-gray-400 w-96 p-10 mx-auto"
          color="transparent"
          shadow={true}
        >
          <Typography variant="h4" color="blue-gray">
            Log In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Welcome Admin!
          </Typography>
          <form
            className="mt-8 mb-2 w-100 max-w-screen-lg sm:w-50"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Username
              </Typography>
              <Input
                size="lg"
                placeholder="username"
                value={enteredUsername}
                onChange={(e) => setEnteredUsername(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                placeholder="*********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            {/*If admin enter the correct information, the AdminDashboard as the landing page*/}

            <CustomButton className="mt-6" fullWidth type="submit">
              Log In
            </CustomButton>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default AdminLogin;
