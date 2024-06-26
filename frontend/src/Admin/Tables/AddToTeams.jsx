import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
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
} from "@material-tailwind/react";
import { DeleteForever } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABLE_HEAD = ["First Name", "Registration No", "NIC", "Add Teams"];

function AddToTeams() {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sportsData, setSportsData] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/student/getStudents"
        );
        setStudentList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    }
    fetchStudents();
  }, [studentList]);

  useEffect(() => {
    async function fetchSports() {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/sport/getSports"
        );

        for (let sport of response.data) {
          const teamDetails = await Promise.all(
            sport.team.map((studentId) =>
              axios.get(`http://localhost:8800/api/student/${studentId}`)
            )
          );
          sport.teamDetails = teamDetails.map((res) => res.data);
          // console.log(sport.teamDetails);
        }
        setSportsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    }
    fetchSports();
  }, [sportsData]);

  const handleAddTeamClick = (student) => {
    setSelectedStudent(student);
  };

  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
  };

  // const handleAddToTeam = () => {
  //   if (selectedStudent && selectedSport) {
  //     setTeams((prevTeams) => {
  //       const newTeams = { ...prevTeams };
  //       if (!newTeams[selectedSport]) {
  //         newTeams[selectedSport] = [];
  //       }
  //       newTeams[selectedSport].push(selectedStudent);
  //       return newTeams;
  //     });
  //     setSelectedStudent(null);
  //     setSelectedSport(null);
  //   }
  // };
  async function handleAddToTeam(e) {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8800/api/sport/addateammember",
        {
          data: { selectedSport, selectedStudent },
        },
        { withCredentials: true }
      );
      setSelectedStudent(null);
      setSelectedSport(null);

      toast.success("Team member added successfully!", {
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
    } catch (err) {
      setError(err.response.data);
      setSelectedStudent(null);
      setSelectedSport(null);
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 4000,
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
          secondary: "#FF5252",
        },
      });
    }
  }

  const handleDelete = (studentId,sportId) => async () => {
    try {
      
      await axios.post(
        "http://localhost:8800/api/sport/deleteteammember",
        {
          studentId:studentId,
          sportId:sportId,
        },
        { withCredentials: true }
      );

      toast.success("Member removed successfully", {
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
    } catch (error) {
      
      toast.error(error, {
        position: "bottom-right",
        autoClose: 4000,
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
          secondary: "#FF5252",
        },
      });
    }
  }
    


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
            {loading ? (
              <div className="flex justify-center">
                <Spinner className="h-16 w-16 text-white" />
              </div>
            ) : (
              <>
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
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={student.nicNo}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar src={""} alt={""} size="sm" />
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
                            className="bg-customGreen border-customGreen border-2 text-white text-lg px-4 py-1 focus:bg-customGreen1"
                            onClick={() => handleAddTeamClick(student)}
                          >
                            +
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </>
            )}
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
        <div className="mb-10">
          <div className="flex mb-5">
            <Typography variant="h6" color="blue-gray">
              Select a sport for {selectedStudent.firstName}:
            </Typography>
          </div>
          <div className="flex flex-wrap gap-2">
            {sportsData.map((sport) => (
              <Button
                key={sport._id}
                className="text-black p-1 bg-transparent border-gray-700 border-2 hover:bg-gray-500 focus:border-red-500"
                onClick={() => handleSportSelect(sport._id)}
              >
                {sport.name}
              </Button>
            ))}
          </div>
          {selectedSport && (
            <div className="flex justify-center">
              <Button
                className="mt-3 px-2 py-2 bg-customGreen border-customGreen border-2 text-white"
                onClick={handleAddToTeam}
              >
                Add to Team
              </Button>
            </div>
          )}
        </div>
      )}

      {sportsData.map((sport) => (
        <Card
          key={sport._id}
          className="h-full w-full mb-5 border border-gray-300 border-t-0 shadow-lg rounded-lg"
        >
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <Typography variant="h5" color="blue-gray">
              {sport.name} Team
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
                      Registration No
                    </Typography>
                  </th>
                  <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      Delete
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sport.teamDetails.map((member, index) => {
                  const isLast = index === sport.teamDetails.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={member._id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {member.firstName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {member.nicNo}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Button className="p-1 bg-white focus:bg-customRed2 border-customRed border-2" onClick= {handleDelete(member._id, sport._id)}>
                          <DeleteForever className="h-4 w-4 text-black" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      ))}
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
    </div>
  );
}

export default AddToTeams;
