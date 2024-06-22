import { Card, Input, Typography } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomButton } from '../TailwindCustomComponents/CustomComponents';
import { useLocation } from 'react-router-dom';

function MyAccount() {
  const loc = useLocation();
  const [admin, setAdmin] = useState({});
  const [adminDetails, setAdminDetails] = useState({
    username: '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // fetchAdminDetails();

    setAdmin(loc.state.user);
    console.log(loc.state.user);
  }, []);

  //   const fetchAdminDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         'http://localhost:8800/api/admin/getAdmin'
  //       );
  //       setAdminDetails(response.data);
  //     } catch (error) {
  //       console.error('Error fetching admin details:', error);
  //     }
  //   };

  const handleChange = (e) => {
    setAdminDetails({
      ...adminDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(adminDetails);
    try {
      await axios.put(
        'http://localhost:8800/api/admin/updateAdmin',
        adminDetails
      );
      setIsEditing(false);
      alert('Admin details updated successfully!');
    } catch (error) {
      console.error('Error updating admin details:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
        <form onSubmit={handleSubmit}>
          {isEditing ? (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <Input
                  className="w-full"
                  id="username"
                  type="text"
                  placeholder="Username"
                  name="username"
                  //value={admin.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Input
                  className="w-full"
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  //value='********'
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <Input
                  className="w-full"
                  id="username"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={admin.username}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Input
                  className="w-full"
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={admin.password}
                  disabled
                />
              </div>
            </>
          )}

          {!isEditing ? (
            <CustomButton
              className="mt-6"
              fullWidth
              onClick={() => setIsEditing(true)}
            >
              Edit
            </CustomButton>
          ) : (
            <>
              <CustomButton className="mt-6" fullWidth type="submit">
                Update
              </CustomButton>
              <CustomButton
                className="mt-2"
                fullWidth
                color="gray"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </CustomButton>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default MyAccount;
