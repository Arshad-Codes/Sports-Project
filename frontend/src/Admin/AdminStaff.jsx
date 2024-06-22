import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomButton } from '../TailwindCustomComponents/CustomComponents';
import StaffsTable from './Tables/StaffsTable';
import { Input, Typography } from '@material-tailwind/react';

const AdminStaff = () => {
  const [sportsList, setSportsList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [user, setUser] = useState({
    email: '',
    sport: '',
    password: '',
    fullName: '',
    position: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const Sportsresponse = await axios.get(
          'http://localhost:8800/api/sport/getSports'
        );
        const Staffsresponse = await axios.get(
          'http://localhost:8800/api/sportscoordinator/getcoordinators'
        );
        setSportsList(Sportsresponse.data);
        setStaffList(Staffsresponse.data);
        setLoading(false);
        //console.log(sportsList);
      } catch (error) {
        console.error('Error fetching Sportscoordinator', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [staffList]);

  function handleChange(e) {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      //console.log(user);
      await axios.post(
        'http://localhost:8800/api/sportscoordinator/registercoordinator',
        {
          user,
        },
        { withCredentials: true }
      );

      toast.success('Sports coordinator added successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#4CAF50',
        },
      });
      //clear the fields
      setUser({
        email: '',
        sport: '',
        password: '',
        fullName: '',
        position: '',
      });
    } catch (err) {
      setError(err.response.data);
      toast.error('Failed to add sports coordinator. Please try again later.', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#FF5252',
        },
      });
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-white my-10 mx-5">
        <div className="py-10 px-14 w-full border border-gray-300 border-t-0 shadow-lg rounded-lg ml-15 mb-5">
          <Typography
            className="flex mb-10 justify-center"
            variant="h4"
            color="blue-gray"
          >
            Add a Sports Coordinator
          </Typography>
          <form
            className="mt-8 mb-2 w-100 max-w-screen-lg sm:w-50"
            onSubmit={handleCreate}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                size="lg"
                type="text"
                name="email"
                onChange={handleChange}
                value={user.email}
                id="email"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Full Name
              </Typography>
              <Input
                size="lg"
                type="text"
                name="fullName"
                onChange={handleChange}
                value={user.fullName}
                id="fullName"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Position
              </Typography>
              <Input
                size="lg"
                type="text"
                name="position"
                onChange={handleChange}
                value={user.position}
                id="position"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>

            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Sports
              </Typography>
              <select
                name="sport"
                onChange={handleChange}
                value={user.sport}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder-gray-500 text-gray-900 focus:outline-1 focus:outline-gray-600"
              >
                {!user.sport && <option value="">Select Sport</option>}
                {sportsList.map((sport) => (
                  <option key={sport._id} value={sport.name}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                size="lg"
                type="password"
                name="password"
                onChange={handleChange}
                value={user.password}
                id="password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <div className="flex items-center justify-center">
              <CustomButton className="mt-6" fullWidth type="submit">
                Create Sports Coordinator
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Sports Coordinators List</h2>

        <StaffsTable />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AdminStaff;
