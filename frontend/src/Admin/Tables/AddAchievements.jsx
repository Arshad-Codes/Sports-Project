import React from "react";
import { Typography, Input, Textarea } from "@material-tailwind/react";
import { CustomButton } from "../../TailwindCustomComponents/CustomComponents";
import { useState } from "react";

const AddAchievements = () =>{

    const [achievement, setAchievement] = useState({
        title: '',
        description: '',
        imgUrl: '',
    });
     
    const handleSubmit = ()=>{
        console.log('Submited');
    }

    const handleChange =()=>{

    }

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
                name="imageUrl"
                onChange={handleChange}
                value={achievement.title}
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