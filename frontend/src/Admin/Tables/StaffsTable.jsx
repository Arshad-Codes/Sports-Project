import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from '@material-tailwind/react';
import { DeleteForever } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";

const TABLE_HEAD = ['Name', 'Email', 'Position', 'Delete', 'More Details'];

function StaffsTable() {
  const [staffsList, setStaffsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get(
          'http://localhost:8800/api/sportscoordinator/getcoordinators'
        );
        setStaffsList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching staffs', error);
        setLoading(false);
      }
    }
    fetchStudents();
  }, [staffsList]);


  const handleDelete = (email) => async () => {
    try {
      await axios.delete(
        `http://localhost:8800/api/sportscoordinator/deletecoordinator/${email}`
        , { withCredentials: true }
      );
      
      toast.success("Sports Coordinator deleted successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: "8px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          fontSize: "16px",
        },
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#4CAF50",
        },
      });
      setStaffsList(staffsList.filter((staff) => staff.email !== email));
    } catch (error) {
      console.error('Error deleting staff', error);
      toast.error("Error deleting staff", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: "8px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          fontSize: "16px",
        },
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#F87171",
        },
      });
    }
  };


  return (
    <Card className="h-full w-full mb-5 border border-gray-300 border-t-0 shadow-lg rounded-lg">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Students
            </Typography>
          </div>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll mt-3 pl-0 pr-3 pb-3 pt-0">
        <table className="mt-2 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{' '}
                    {index == TABLE_HEAD.length - 4 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staffsList.map(({ fullName, email, position, sport }, index) => {
              const isLast = index === staffsList.length - 1;
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={''} alt={''} size="sm" />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {fullName}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  <td className={classes}>
                    <div className="w-max">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {sport}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Button onClick={handleDelete(email)} className="bg-customRed2 border-customRed border-2">
                      <DeleteForever className="h-4 w-4 text-black" />
                    </Button>
                  </td>
                  <td className={classes}>
                    <Button className="text-customGreen1 font-bold bg-customGreen3 border-customGreen2 border-2">
                      See More..
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
export default StaffsTable;
