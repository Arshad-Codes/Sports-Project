import NavBar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { Card, CardBody, Spinner, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SpecificCoordinator() {
  const [staffList, setStaffList] = useState([]);
  const { position } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchSports() {
      try {
        const response = await axios.get(
          'https://ruhunasports.onrender.com/api/sportscoordinator/getcoordinators'
        );
        setStaffList(response.data);
        setLoading(false);
        // console.log(staffList);
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    }
    fetchSports();
  }, []);
  const coordinator = staffList.find(
    (staff) => staff.position.trim() === position.trim()
  );

  //also add something idk maybe for not found or something
  if (!coordinator || loading) {
    return (
      <>
        <NavBar />
        <div className="mt-5 flex justify-center items-center h-">
          <Spinner className="h-14 w-14" color="green" />
        </div>
      </>
    );
  } else {
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
