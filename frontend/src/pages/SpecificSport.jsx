import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import { CustomButton } from "../TailwindCustomComponents/CustomComponents";
import { useEffect, useState } from "react";
import axios from "axios";

function SpecificSport() {
  const { name } = useParams();
  //console.log(name);
  const [sportsData, setSportsData] = useState([]);
  const [enrolledSports, setenrolledSports] = useState([]);

  useEffect(() => {
    async function fetchSports() {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/sport/getSports"
        );
        setSportsData(response.data);
        const resp = await axios.post(
          "http://localhost:8800/api/sport/getenrolledstudentsbyname",
          {
            name: name,
          }
        );
        setenrolledSports(resp.data);
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    }
    fetchSports();
  }, []);

  const sports = sportsData.find((sport) => sport.name.trim() === name.trim());
  if (!sports) {
    return <div>Loading....</div>;
  }

  const handleEnroll = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      return alert("Please login to enroll");
    } else if (currentUser.role !== "student") {
      return alert("Only students can enroll");
    }
    try {
      const response = await axios.post(
        "http://localhost:8800/api/student/enroll",
        {
          sportId: sports._id,
          studentId: currentUser._id,
        },
        { withCredentials: true }
      );
      return alert("Enrolled successfully");
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isEnrolled =
    currentUser &&
    currentUser.role === "student" &&
    enrolledSports.includes(currentUser._id);

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
              <CustomButton
                onClick={handleEnroll}
                className="mt-5 w-36"
                disabled={isEnrolled}
              >
                {isEnrolled ? "Already Enrolled" : "Enroll"}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-customGreen mt-10">
        <h1 className="text-white">Faculty Team</h1>
        <div>
          <div className="grid grid-cols-2">
            <h1>Hiii</h1>
            <h1>Hiii</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-20">
        <CustomButton
          className="mr-2"
          onClick={() => (window.location.href = "/achievement")}
        >
          Achievement
        </CustomButton>
        <CustomButton>Events</CustomButton>
      </div>
    </>
  );
}

export default SpecificSport;
