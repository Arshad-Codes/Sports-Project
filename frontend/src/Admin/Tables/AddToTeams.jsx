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
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  
  const TABLE_HEAD = [
    'First Name',
    'Registration No',
    'NIC',
    'Add Teams',
  ];
  
  function AddToTeams() {
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sportsData, setSportsData] = useState([]);
    const [selectedSport, setSelectedSport] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [teams, setTeams] = useState([]);
  
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
    }, []);
  
    useEffect(() => {
      async function fetchSports() {
        try {
          const response = await axios.get(
            'http://localhost:8800/api/sport/getSports'
          );
          setSportsData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching sports:', error);
          setLoading(false);
        }
      }
      fetchSports();
    }, []);
  
    const handleAddTeamClick = (student) => {
      setSelectedStudent(student);
    };
  
    const handleSportSelect = (sport) => {
      setSelectedSport(sport);
    };
  
    const handleAddToTeam = () => {
      if (selectedStudent && selectedSport) {
        setTeams([...teams, { ...selectedStudent, sport: selectedSport }]);
        setSelectedStudent(null);
        setSelectedSport(null);
      }
    };
  
    return (
      <div>
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
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {studentList.map((student, index) => {
                  const isLast = index === studentList.length - 1;
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50';
  
                  return (
                    <tr key={student.nicNo}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar src={''} alt={''} size="sm" />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {student.firstName}
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
                            {student.regNo}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {student.nicNo}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Button
                          className="bg-customGreen border-customGreen border-2 text-white"
                          onClick={() => handleAddTeamClick(student)}
                        >
                          Add Teams
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
  
        {selectedStudent && (
          <div className="mb-5">
            <Typography variant="h6" color="blue-gray">
              Select a sport for {selectedStudent.firstName}:
            </Typography>
            <div className="flex flex-wrap gap-2">
              {sportsData.map((sport) => (
                <Button
                  key={sport.name}
                  className="bg-blue-500 text-white border-blue-500 border-2"
                  onClick={() => handleSportSelect(sport.name)}
                >
                  {sport.name}
                </Button>
              ))}
            </div>
            {selectedSport && (
              <Button
                className="mt-3 bg-customGreen border-customGreen border-2 text-white"
                onClick={handleAddToTeam}
              >
                Add to Team
              </Button>
            )}
          </div>
        )}
  
        <Card className="h-full w-full mb-5 border border-gray-300 border-t-0 shadow-lg rounded-lg">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <Typography variant="h5" color="blue-gray">
              Teams
            </Typography>
          </CardHeader>
          <CardBody className="overflow-scroll mt-3 pl-0 pr-3 pb-3 pt-0">
            <table className="mt-2 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      Student Name
                    </Typography>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      Sport
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => {
                  const isLast = index === teams.length - 1;
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50';
  
                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {team.firstName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {team.sport}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  export default AddToTeams;
  