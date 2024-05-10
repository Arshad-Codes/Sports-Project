import { Card, Input, Typography } from '@material-tailwind/react';
import { CustomButton } from '../TailwindCustomComponents/CustomComponents';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || '';
  const handleButtonClick = (role) => {
    navigate('/signup', { state: { role } });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (role === 'Student') {
        res = await axios.post(
          'https://ruhunasports.onrender.com/api/student/login',
          {
            email,
            password,
          },
          { withCredentials: true }
        );
      } else if (role === 'Admin') {
        res = await axios.post(
          'https://ruhunasports.onrender.com/api/admin/login',
          {
            username,
            password,
          },
          { withCredentials: true }
        );
      } else if (role === 'Sport Coordinator') {
        res = await axios.post(
          'https://ruhunasports.onrender.com/api/Staff/login',
          {
            username,
            password,
          },
          { withCredentials: true }
        );
      }

      if (res.status === 200) {
        localStorage.setItem('currentUser', JSON.stringify(res.data));

        if (role === 'Student') {
          navigate('/home', { state: { role } });
        } else if (role === 'Admin') {
          navigate('/admin/dashboard', role);
        } else if (role === 'Sport Coordinator') {
          navigate('/staff/dashboard', role);
        }

        toast.success('Login successful!');
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div>
      <div>
        <button
          type="button"
          className=" text-black px-10 py-5 hover:text-blue-700 hover:scale-105 transition-transform"
          onClick={() => (window.location.href = '/')}
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
          className="flex border border-gray-400 p-10 mx-auto"
          color="transparent"
          shadow={true}
        >
          <Typography variant="h4" color="blue-gray">
            {role === 'Admin'
              ? 'Admin Login'
              : role === 'Sport Coordinator'
              ? 'Sports Coordinator Login'
              : 'Student Login'}
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Welcome back! Enter your valid details to log in.
          </Typography>
          <form
            onSubmit={handleLogin}
            className="mt-8 mb-2 w-100 max-w-screen-lg sm:w-50"
          >
            <div className="mb-1 flex flex-col gap-6">
              {role === 'Student' ? (
                <>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Student Email
                  </Typography>
                  <Input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    size="lg"
                    placeholder="name@engug/dep.ruh.ac.lk"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Username
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                  />
                </>
              )}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>

            {/* <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  Remember me
                </Typography>
              }
              containerProps={{ className: '-ml-2.5' }}
            /> */}
            <CustomButton type="submit" className="mt-6" fullWidth>
              Log In
            </CustomButton>
            {error && <Typography color="red">{error}</Typography>}
            {role === 'Student' ? (
              <Typography color="gray" className="mt-4 text-center font-normal">
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => handleButtonClick('Student')}
                  className="font-medium text-gray-900"
                >
                  Sign Up
                </button>
              </Typography>
            ) : null}
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
