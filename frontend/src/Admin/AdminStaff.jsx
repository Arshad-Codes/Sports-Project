import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomButton } from '../TailwindCustomComponents/CustomComponents';

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
          'https://ruhunasports.onrender.com/api/sport/getSports'
        );
        const Staffsresponse = await axios.get(
          'https://ruhunasports.onrender.com/api/sportscoordinator/getcoordinators'
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
        'https://ruhunasports.onrender.com/api/sportscoordinator/registercoordinator',
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
          background: '#4CAF50',
          color: '#FFFFFF',
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
          background: '#FF5252',
          color: '#FFFFFF',
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
      <div className="flex flex-col items-center justify-start min-h-screen min-w-full bg-white mt-3 px-10">
        <div className="py-10 px-14 w-full border border-gray-300 border-t-0 shadow-lg rounded-lg ml-15 mb-5">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-black">
              Add a Sports Coordinator
            </h1>
          </div>
          <form className="space-y-5" onSubmit={handleCreate}>
            <div className="shadow-sm">
              <label className="sr-only">Email</label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                id="email"
                placeholder="Email"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-1 focus:outline-gray-600"
              />
            </div>
            <div className="shadow-sm">
              <label className="sr-only">Full Name</label>
              <input
                type="text"
                name="fullName"
                onChange={handleChange}
                id="fullName"
                placeholder="Enter the full name"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-1 focus:outline-gray-600"
              />
            </div>
            <div className="shadow-sm">
              <label className="sr-only">Position</label>
              <input
                type="text"
                name="position"
                onChange={handleChange}
                id="position"
                placeholder="Enter the Position"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-1 focus:outline-gray-600"
              />
            </div>

            <div className="shadow-sm">
              <label className="sr-only">Sports</label>
              <select
                name="sport"
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-1 focus:outline-gray-600"
              >
                <option value="">Select Sport</option>
                {sportsList.map((sport) => (
                  <option key={sport._id} value={sport.name}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="shadow-sm">
              <label className="sr-only">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                id="password"
                placeholder="Password"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-1 focus:outline-gray-600"
              />
            </div>
            <div className="flex items-center justify-center">
              <CustomButton className="mt-6" fullWidth type="submit">
                ADD
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Sports Coordinators List</h2>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {staffList.map((staff) => (
              <div
                key={staff._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex h-72"
              >
                <img
                  src={staff.imageUrl}
                  alt={staff.name}
                  className="w-1/3 h-auto object-cover"
                />
                <div className="p-4 w-2/3">
                  <h3 className="text-xl font-bold mb-2">{staff.fullName}</h3>
                  <p className="text-gray-600">{staff.position}</p>
                  <p className="text-gray-600">{staff.email}</p>
                  <p className="text-gray-600">{staff.sport}</p>
                </div>
              </div>
            ))}
          </div>
        )}
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
