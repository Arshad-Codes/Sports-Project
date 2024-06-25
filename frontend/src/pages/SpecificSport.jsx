import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { CustomButton } from '../TailwindCustomComponents/CustomComponents';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import Footer from '../components/Footer';

function SpecificSport() {
  const { name } = useParams();
  const [sportsData, setSportsData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const printRef = useRef();
  const [printable, setPrintable] = useState(false);

  const TABLE_HEAD = ['First Name', 'Registration No'];
  const TABLE_HEAD_PRINT = ['First Name', 'Registration No', 'NIC'];

  useEffect(() => {
    async function fetchSports() {
      try {
        const response = await axios.get(
          'https://ruhunasports.onrender.com/api/sport/getSports'
        );

        for (let sport of response.data) {
          const teamDetails = await Promise.all(
            sport.team.map((studentId) =>
              axios.get(
                `https://ruhunasports.onrender.com/api/student/${studentId}`
              )
            )
          );
          sport.teamDetails = teamDetails.map((res) => res.data);
        }
        setSportsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    }
    fetchSports();
  }, [sportsData]);

  const handleEnroll = async () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      return alert('Please login to enroll');
    } else if (currentUser.role !== 'student') {
      return alert('Only students can enroll');
    }
    try {
      const response = await axios.post(
        'https://ruhunasports.onrender.com/api/student/enroll',
        {
          sportId: sports._id,
          studentId: currentUser._id,
        },
        { withCredentials: true }
      );
      console.log(response);
      alert('Enrolled successfully');
      navigate('/');
    } catch (error) {
      console.error('Error enrolling:', error);
    }
  };

  const handlePrintOpen = () => {
    setPrintable(true);
  };

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const sports = sportsData.find((sport) => sport.name.trim() === name.trim());
  if (!sports || loading) {
    return (
      <>
        <NavBar />
        <div className="mt-5 flex justify-center items-center h-">
          <Spinner className="h-14 w-14" color="green" />
        </div>
      </>
    );
  } else {
    const boysTeam = sports.teamDetails.filter(
      (member) => member.gender === 'Male'
    );
    const girlsTeam = sports.teamDetails.filter(
      (member) => member.gender === 'Female'
    );

    return (
      <>
        <NavBar />
        <div>
          <div className="mt-5 bg-customGreen">
            <h1 className="text-white p-2 text-2xl">{sports.name}</h1>
          </div>
          <div className="flex flex-row mt-5 bg-blue-gray-100">
            <div className="basis-1/4">
              <img
                className="h-96 w-full"
                src={sports.imageUrl}
                alt={sports.name}
              />
            </div>
            <div className="basis-3/4 flex items-center justify-center">
              <div className="text-center">
                <h1 className="p-10 font-medium">{sports.description}</h1>
                <CustomButton onClick={handleEnroll} className="mt-5 w-36">
                  Enrol
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
        <div ref={printRef} className="my-10">
          <div className="flex bg-customGreen justify-between items-center">
            {!printable && (
              <h1 className="text-white p-2 text-2xl ">
                Faculty Team - {sports.name}
              </h1>
            )}
            {printable && (
              <h1 className="text-gray-700 p-2 text-2xl ">
                Faculty Team - {sports.name}
              </h1>
            )}
            {!printable && (
              <div className="flex justify-center">
                <CustomButton
                  onClick={handlePrintOpen}
                  className="w-36 shadow-none"
                >
                  Print Team
                </CustomButton>
              </div>
            )}
            {printable && (
              <div className="flex justify-center">
                <CustomButton
                  onClick={handlePrint}
                  className="w-36 shadow-none"
                >
                  Confirm
                </CustomButton>
              </div>
            )}
          </div>

          <div className="w-full justify-between my-5 px-3 sm:px-10 md:px-20 lg:px-14 lg:gap-10 lg:flex">
            <Card className="flex h-full w-full mb-10 border border-gray-300 rounded-lg">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="flex items-center justify-center">
                  <Typography variant="h5" color="blue-gray">
                    Boys Team
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="overflow-scroll sm:overflow-hidden mt-3 pl-0 pr-3 pb-3 pt-0">
                <table className="mt-2 w-full min-w-max table-auto text-left">
                  {loading ? (
                    <div className="flex justify-center">
                      <Spinner className="h-16 w-16 text-white" />
                    </div>
                  ) : (
                    <>
                      {printable && (
                        <thead>
                          <tr>
                            {TABLE_HEAD_PRINT.map((head) => (
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
                      )}
                      {!printable && (
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
                      )}

                      <tbody>
                        {boysTeam.map((member, index) => {
                          const isLast = index === boysTeam.length - 1;
                          const classes = isLast
                            ? 'p-4'
                            : 'p-4 border-b border-blue-gray-50';

                          return (
                            <tr key={member._id}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Avatar src={''} alt={''} size="sm" />
                                  <div className="flex flex-col">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {member.firstName}
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
                                    {member.regNo}
                                  </Typography>
                                </div>
                              </td>
                              {printable && (
                                <td className={classes}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {member.nicNo}
                                  </Typography>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </>
                  )}
                </table>
              </CardBody>
            </Card>
            <Card className="flex h-full w-full mb-5 border border-gray-300 rounded-lg">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="flex items-center justify-center">
                  <Typography variant="h5" color="blue-gray">
                    Girls Team
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="overflow-scroll sm:overflow-hidden mt-3 pl-0 pr-3 pb-3 pt-0">
                <table className="mt-2 w-full min-w-max table-auto text-left">
                  {loading ? (
                    <div className="flex justify-center">
                      <Spinner className="h-16 w-16 text-white" />
                    </div>
                  ) : (
                    <>
                      {printable && (
                        <thead>
                          <tr>
                            {TABLE_HEAD_PRINT.map((head) => (
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
                      )}
                      {!printable && (
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
                      )}

                      <tbody>
                        {girlsTeam.map((member, index) => {
                          const isLast = index === girlsTeam.length - 1;
                          const classes = isLast
                            ? 'p-4'
                            : 'p-4 border-b border-blue-gray-50';

                          return (
                            <tr key={member._id}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Avatar src={''} alt={''} size="sm" />
                                  <div className="flex flex-col">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {member.firstName}
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
                                    {member.regNo}
                                  </Typography>
                                </div>
                              </td>
                              {printable && (
                                <td className={classes}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {member.nicNo}
                                  </Typography>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </>
                  )}
                </table>
              </CardBody>
            </Card>
          </div>
          {printable && (
            <div className="px-5">
              <Typography>...................</Typography>
              <Typography>Signature</Typography>
              <br></br>
              <Typography className="flex justify-center items-center">
                - Auto Generated By Ruhuna Sports Website -
              </Typography>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default SpecificSport;
