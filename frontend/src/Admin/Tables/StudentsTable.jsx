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

const TABLE_HEAD = [
  'First Name',
  'Registration No',
  'NIC',
  'Delete',
  'More Details',
];

function StudentsTable() {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get(
          'http://localhost:8800/api/student/getStudents'
        );
        setStudentList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students', error);
        setLoading(false);
      }
    }
    fetchStudents();
  }, [studentList]);
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
            {studentList.map(({ firstName, regNo, nicNo }, index) => {
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
                    <Button className="bg-customRed2 border-customRed border-2">
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
export default StudentsTable;
