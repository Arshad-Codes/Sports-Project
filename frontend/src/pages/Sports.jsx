import { sportsData } from '../data';
import NavBar from '../components/Navbar';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

function Sports() {
  const { sports } = sportsData;
  return (
    <>
      <NavBar />
      <div className="mx-5 my-5">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
          {sports.map((item, index) => (
            <Card
              className="transition-transform transform hover:shadow-lg hover:scale-105"
              key={index}
            >
              <CardHeader color="transparent" className="m-0">
                <a href="#">
                  <img
                    className="w-full h-64 object-cover"
                    src={item.urls}
                    alt={item.name}
                  />
                </a>
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
