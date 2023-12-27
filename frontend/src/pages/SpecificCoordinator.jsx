import React from "react";
import NavBar from "../components/Navbar";
import { sportCoordinatorsDatas } from "../datas";
import { useParams } from "react-router-dom";
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";

function SpecificCoordinator(){
    const {staffs} = sportCoordinatorsDatas;

    const {position} = useParams();

    const coordinator = staffs.find((staff) => staff.position === position);

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

    return (
        <>
          <NavBar />
          <div className="mx-5 my-5">
            <Card>
              <CardHeader color="lightBlue" className="text-center">
                <img
                  className="w-full h-64 object-cover"
                  src={coordinator.urls}
                  alt={coordinator.name}
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h3" color="blue-gray" className="text-center">
                  {coordinator.name}
                </Typography>
                <Typography variant="h5" color="gray" className="text-center">
                  {coordinator.position}
                </Typography>
                <p className="text-center mt-4">{coordinator.Description}</p>
              </CardBody>
            </Card>
          </div>
        </>
      );
}
export default SpecificCoordinator;