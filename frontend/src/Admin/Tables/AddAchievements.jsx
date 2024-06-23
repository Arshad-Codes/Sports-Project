import React from "react";
import { Typography, Input, Textarea } from "@material-tailwind/react";
import { CustomButton } from "../../TailwindCustomComponents/CustomComponents";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const AddAchievements = () =>{

    const [achievement, setAchievement] = useState({
        title: '',
        description: '',
        imgUrl: '',
    });
     
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post(
            'http://localhost:8800/api/achievement/create',
            {
              ...achievement,
            },
            { withCredentials: true }
          );
          toast.success('Achievement added successfully!', {
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
              secondary: '#4CAF50',
            },
          });

          //clear the fields
          setAchievement({
            title: '',
            description: '',
            imgUrl: '',
          });
        } catch (error) {
          console.error(error);
          toast.error('Failed to add Achievement. Please try again.', {
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
      };


      const handleChange = (e) => {
        setAchievement((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      };

    return(
    <div>
      <div className="flex items-center justify-center h-3/4 my-10 mx-5">
        <div className="py-10 px-14 w-full mx-auto border border-gray-300 border-t-0 shadow-lg rounded-lg">
          <Typography
            className="flex justify-center"
            variant="h4"
            color="blue-gray"
          >
            Create Achievement
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
                name="title"
                onChange={handleChange}
                value={achievement.title}
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
              <Textarea
                name="description"
                onChange={handleChange}
                value={achievement.description}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              ></Textarea>
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                ImageUrl
              </Typography>
              <Input
                size="lg"
                name="imgUrl"
                onChange={handleChange}
                value={achievement.imgUrl}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <CustomButton className="mt-6" fullWidth type="submit">
              Create Achievement
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
    )
}

export default AddAchievements;