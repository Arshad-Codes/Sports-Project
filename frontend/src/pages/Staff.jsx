import NavBar from '../components/Navbar';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Staff() {
  //const { staffs } = sportCoordinatorsData;
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchSports() {
      try {
        const response = await axios.get(
          'https://ruhunasports.onrender.com/api/sportscoordinator/getcoordinators'
        );
        setStaffList(response.data);
        console.log(staffList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sports:', error);
        setLoading(false);
      }
    }
    fetchSports();
  }, []);
  const handleStaffClick = (position) => {
    navigate(`/staffs/${position}`);
  };

  return (
    <>
      <NavBar />
      <div className="mx-5 my-5">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
          {staffList.map((item, index) => (
            <Card
              className="transition-transform transform hover:shadow-lg hover:scale-105"
              key={index}
              onClick={() => handleStaffClick(item.position)}
            >
              <CardHeader color="transparent" className="m-0">
                <img
                  className="w-full h-64 object-cover"
                  src={item.urls}
                  alt={item.fullName}
                />
              </CardHeader>

              <CardBody>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="text-center"
                >
                  {item.fullName}
                </Typography>
                <Typography variant="h6" color="gray" className="text-center">
                  {item.position}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Staff;
