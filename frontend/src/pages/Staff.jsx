
import { sportCoordinatorsDatas } from '../datas';
import NavBar from '../components/Navbar';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';


function Staff() {
  const { staffs } = sportCoordinatorsDatas;

  const navigate = useNavigate();
  
  const handleStaffClick = (position) => {
    navigate(`/staffs/${position}`);
  };

  return (
    <>
      <NavBar />
      <div className="mx-5 my-5">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
          {staffs.map((item, index) => (
            <Card
              className="transition-transform transform hover:shadow-lg hover:scale-105"
              key={index}
              onClick={() => handleStaffClick(item.position)}
            >
              <CardHeader color="transparent" className="m-0">
                  <img
                    className="w-full h-64 object-cover"
                    src={item.urls}
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
