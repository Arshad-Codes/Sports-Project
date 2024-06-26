import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import profile from '../assests/profile.jpg';

function Staff() {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchSports() {
      try {
        const response = await axios.get(
          'https://ruhunasports.onrender.com/api/sportscoordinator/getcoordinators'
        );
        setStaffList(response.data);
        // console.log(staffList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    }
    fetchSports();
  }, []);

  const handleStaffClick = (position) => {
    navigate(`/staffs/${position}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow mx-5 my-5">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner className="h-14 w-14" color="green" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {staffList.map((item, index) => (
              <Card
                className="transition-transform transform hover:shadow-lg hover:scale-105"
                key={index}
                onClick={() => handleStaffClick(item.position)}
              >
                <CardHeader color="transparent" className="m-0">
                  {item.urls && (
                    <img
                      className="w-full h-64 object-cover"
                      src={item.urls}
                      alt={item.fullName}
                    />
                  )}
                  <img
                    className="w-full h-64 object-cover"
                    src={profile}
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
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Staff;
