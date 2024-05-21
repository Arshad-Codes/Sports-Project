import React from "react";
import { Card, Input, Checkbox, Typography } from '@material-tailwind/react';
import { CustomButton } from "../TailwindCustomComponents/CustomComponents";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const EditProfile = ()=>{

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        //const {id} = useParams();
        const userID = currentUser._id;

        const [userData, setUserData] = useState({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            regNo: '',
            nicNo: '',
            achievements: '',
          });
        
        //   useEffect(() => {
        //     if (currentUser) {
        //       setUserData(currentUser);
        //     }
        //   }, []); 

          useEffect(() => {
            axios.get(`http://localhost:8800/api/student/${userID}`)
            .then(response => {
                setUserData({
                  ...response.data,
                });
                console.log(userID);
              })
              .catch(error => console.log(error));
          }, [userID]);

          const handleChange = (event) => {
            const { name, value } = event.target;
            setUserData({
              ...userData,
              [name]: value,
            });
          };

    const HandleClick = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8800/api/student/${userID}`, userData)
            .then(response => {
                console.log(response.data);
                localStorage.setItem('currentUser', JSON.stringify(response.data));
                alert('Profile Updated');
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
          <div>
            <button
              type="button"
              className=" text-black px-10 py-5 hover:text-blue-700 hover:scale-105 transition-transform"
              onClick={() => (window.location.href = '/myprofile')}
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
                <p className="ml-1">My Account</p>
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
                Edit My Profile
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Enter the valid details
              </Typography>
              <form
                className="mt-8 mb-2 w-100 max-w-screen-lg sm:w-96"
                onSubmit={HandleClick}
              >
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    First Name
                  </Typography>
                  <Input
                    size="lg"
                    onChange={handleChange}
                    name="firstName"
                    value={userData.firstName}
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
                    value={userData.lastName}
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
                    value={userData.regNo}
                    placeholder="EG/YYYY/XXXX"
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
                    value={userData.dateOfBirth}
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
                    value={userData.nicNo}
                    placeholder="XXXXXXXXXX or XXXXXXXXXV"
                    type="text"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Achievements
                  </Typography>
                  <Input
                    size="lg"
                    onChange={handleChange}
                    name="achievements"
                    value={userData.achievements}
                    placeholder="You can mention your sports achievements here."
                    type="text"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                  />
                </div>
                <CustomButton className="mt-6" fullWidth type="submit">
                  Save Changes
                </CustomButton>
              </form>
            </Card>
          </div>
        </div>
      );
};

export default EditProfile;