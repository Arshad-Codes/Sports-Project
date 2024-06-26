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
  Spinner,
} from '@material-tailwind/react';
import { DeleteForever } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TABLE_HEAD = [
  'First Name',
  'Registration No',
  'NIC',
  'Email',
  'Delete',
  // 'More Details',
];

function StudentsTable() {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get(
          'https://ruhunasports.onrender.com/api/student/getStudents'
        );
        setStudentList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students', error);
      }
    }
    fetchStudents();
  }, [studentList]);

  const handleDelete = (email) => async () => {
    try {
      await axios.delete(
        `https://ruhunasports.onrender.com/api/student/deleteStudent/${email}`,
        {
          withCredentials: true,
        }
      );
      toast.success('Student Deleted successfully!', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#4CAF50',
        },
      });
    } catch (error) {
      console.error('Error deleting student', error);
      toast.error('Failed, Check your internet connection and try again', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#FF5252',
        },
      });
    }
  };

  return (
    <>
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
            {loading ? (
              <div className="flex justify-center">
                <Spinner className="h-16 w-16 text-white" />
              </div>
            ) : (
              <>
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
                          {index == TABLE_HEAD.length - 3 && (
                            <ChevronUpDownIcon
                              strokeWidth={2}
                              className="h-4 w-4"
                            />
                          )}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {studentList.map(
                    ({ firstName, regNo, nicNo, email }, index) => {
                      const isLast = index === studentList.length - 1;
                      const classes = isLast
                        ? 'p-4'
                        : 'p-4 border-b border-blue-gray-50';

                      return (
                        <tr key={nicNo}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Avatar src={''} alt={''} size="sm" />
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {firstName}
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
                                {regNo}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {nicNo}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {email}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Button
                              className="bg-customRed2 border-customRed border-2"
                              onClick={handleDelete(email)}
                            >
                              <DeleteForever className="h-4 w-4 text-black" />
                            </Button>
                          </td>
                          {/* <td className={classes}>
                            <Button className="text-customGreen1 font-bold bg-customGreen3 border-customGreen2 border-2">
                              See More..
                            </Button>
                          </td> */}
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </>
            )}
          </table>
        </CardBody>
        {/*<CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
        </CardFooter>*/}
      </Card>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
export default StudentsTable;
