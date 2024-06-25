import React, { useState } from 'react';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import NavBar from '../components/Navbar';
import DatePicker from '../components/DatePicker';

function EmailPage() {
  const [role, setRole] = useState(location.state?.role || '');
  const [formData, setFormData] = useState({
    to: '',
    sports: '',
    subject: '',
    reason: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prevData) => ({
      ...prevData,
      date: newDate,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8800/api/student/sendEmail",
        {
          studentId: currentUser._id,
          reciever: selectedOptions.option,
          sportName: selectedOptions.option4,
          subject: e.target.Subject.value,
          reason: e.target.Reason.value,
          date: selectedDate,
        }
      );
      if (res.status === 200) {
        alert("Your Request sent successfully!");
      }
    } catch (error) {
      console.error("Failed to send your request", error);
    }

    // Reset form
    setSelectedOptions({
      option: "",
      option4: "",

    });
  };

  return (
    <>
      <NavBar role={role} />
      <div className="container mx-auto p-4">
        <Card className="shadow-lg">
          <CardBody className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Typography className="text-lg font-medium">To</Typography>
                <input
                  type="text"
                  name="to"
                  className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  value={formData.to}
                  onChange={handleInputChange}
                  placeholder="Recipient"
                />
              </div>

              <div className="mb-6">
                <Typography className="text-lg font-medium">Sports</Typography>
                <input
                  type="text"
                  name="sports"
                  className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  value={formData.sports}
                  onChange={handleInputChange}
                  placeholder="Sport"
                />
              </div>

              <div className="mb-6">
                <Typography className="text-lg font-medium">Subject</Typography>
                <input
                  type="text"
                  name="subject"
                  className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                />
              </div>

              <div className="mb-6">
                <Typography className="text-lg font-medium">Reason</Typography>
                <input
                  type="text"
                  name="reason"
                  className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Reason"
                />
              </div>

              <div className="mb-6">
                <Typography className="text-lg font-medium">Date</Typography>
                <DatePicker value={formData.date} onChange={handleDateChange} />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  color="blue"
                  className="px-8 py-3 text-base"
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default EmailPage;
