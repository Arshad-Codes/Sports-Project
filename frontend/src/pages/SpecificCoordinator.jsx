import React from "react";
import NavBar from "../components/Navbar";
import { sportCoordinatorsDatas } from "../datas";
import { useParams } from "react-router-dom";
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";

function SpecificCoordinator(){
    const {staffs} = sportCoordinatorsDatas;

    const {position} = useParams();

    const coordinator = staffs.find((staff) => staff.position.trim() === position.trim());

    //also add something idk maybe for not found or somthing
    if (!coordinator) {
        return (
          <>
            <NavBar />
            <div>
              <h1>Coordinator Not Found</h1>
            </div>
          </>
        );
      }

else {
  return (
    <>
      <NavBar />
      <div className="flex mx-5 my-5">
        <div className="w-1/3 pr-5">
          <img
            className="w-full h-64 object-cover rounded-full"
            src={coordinator.urls}
            alt={coordinator.name}
          />
            <Typography variant="h3" color="blue-gray" className="text-center">
                {coordinator.name}
              </Typography>
              <Typography variant="h5" color="gray" className="text-center">
                {coordinator.position}
              </Typography>
              <Typography variant="h6" color="gray" className="text-center">
                {coordinator.academic}
              </Typography>
              <div className="text-center mt-4">
                <p>Contact:</p>
                <p>Phone: {coordinator.phone}</p>
                <p>Email: {coordinator.email}</p>
              </div>
        </div>
        <div className="w-2/3">
          <Card>
            <CardBody>
              <Typography variant="h2" color="green" className="text-center">
                  {coordinator.sport}
              </Typography>
              <div className="text-left mt-4">
                <p>About: </p>
                <p>{coordinator.Description}</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );  
}
}
export default SpecificCoordinator;