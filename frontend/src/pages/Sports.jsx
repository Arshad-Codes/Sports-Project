import NavBar from '../components/Navbar';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Sports() {
  const navigate = useNavigate();
  const [sportsData, setSportsData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchSports() {
      try {
        const response = await axios.get(
          'http://localhost:8800/api/sport/getSports'
        );
        setSportsData(response.data);
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    }
    fetchSports();
  }, []);

  const handleSportClick = (name) => {
    navigate(`/sports/${name}`);
  };
  return (
    <>
      <NavBar />
      <div className="mx-5 my-5">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
          {sportsData.map((item, index) => (
            <Card
              className="transition-transform transform hover:shadow-lg hover:scale-105"
              key={index}
              onClick={() => handleSportClick(item.name)}
            >
              <CardHeader color="transparent" className="m-0">
                <img
                  className="w-full h-64 object-cover"
                  src={item.imageUrl}
                  alt={item.name}
                />
              </CardHeader>

              <CardBody>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="text-center"
                >
                  {item.name}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sports;
