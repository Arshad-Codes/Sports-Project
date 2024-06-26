import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import NavBar from "../components/Navbar";
import DatePicker from "../components/DatePicker";
import axios from "axios";

function EmailPage() {
  const [role, setRole] = useState(location.state?.role || "");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser") || "{}")
  );
  const [selectedOptions, setSelectedOptions] = useState({
    option4: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [sports, setSports] = useState([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8800/api/student/getEnrolledSports",
          {
            studentId: currentUser._id,
          }
        );
        setSports(response.data);
        if (response.data.length > 0) {
          setSelectedOptions((prevOptions) => ({
            ...prevOptions,
            option4: response.data[0].name,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch sports", error);
      }
    };

    fetchSports();
  }, [currentUser._id]);

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const receiver = e.target.reciever.value;
      const sportName = selectedOptions.option4;
      const subject = e.target.Subject.value;
      const reason = e.target.Reason.value;
      const date = selectedDate;

      const res = await axios.post(
        "http://localhost:8800/api/student/sendEmail",
        {
          studentId: currentUser._id,
          reciever: receiver,
          sportName: sportName,
          subject: subject,
          reason: reason,
          date: date,
        }
      );
      if (res.status === 200) {
        alert("Your Request sent successfully!");
      }
    } catch (error) {
      console.error("Failed to send your request", error);
    }

    e.target.reset(); // Clear form fields
    setSelectedDate(""); // Clear selected date
  };

  return (
    <>
      <NavBar role={role} />
      <div className="container mx-auto p-4">
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <Typography>To</Typography>
              <input
                name="reciever"
                type="text"
                className="w-full px-4 py-2 mb-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Email Address of Warden"
              />

              <Typography>Sports</Typography>
              <select
                name="option4"
                className="block w-full px-4 py-2 mb-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                value={selectedOptions.option4}
                onChange={handleOptionChange}
              >
                {sports.map((sport) => (
                  <option key={sport._id} value={sport.name}>
                    {sport.name}
                  </option>
                ))}
              </select>

              <Typography>Subject</Typography>
              <input
                name="Subject"
                type="text"
                className="w-full px-4 py-2 mb-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Subject"
              />

              <Typography>Reason</Typography>
              <textarea
                name="Reason"
                className="w-full h-24 px-4 py-2 mb-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Reason"
              />

              <Typography>Date</Typography>
              <DatePicker value={selectedDate} onChange={handleDateChange} />

              <Button type="submit" color="blue">
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default EmailPage;
