import React, { useState } from 'react';
import { Button, Card, CardBody, Typography } from '@material-tailwind/react';
import NavBar from '../components/Navbar';
import DatePicker from '../components/DatePicker';

function EmailPage() {
  const [role, setRole] = useState(location.state?.role || '');
  const [selectedOptions, setSelectedOptions] = useState({
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  });

  const [selectedDate, setSelectedDate] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // check the data comes after clicking the submit button
    console.log('Form submitted:', selectedOptions);
    console.log('Date: ', selectedDate);

    //reset
    setSelectedOptions({
      option1: '',
      option2: '',
      option3: '',
      option4: '',
    });
    setSelectedDate('');
  };

  return (
    <>
      <NavBar role={role} />
      <div className="container mx-auto p-4">
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <Typography>To</Typography>
              <select
                name="option4"
                className="block w-full px-4 py-2 mb-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                value={selectedOptions.option4}
                onChange={handleOptionChange}
              >
                <option value="">To</option>
                <option value="Cricket">Male Hostel Warden</option>
                <option value="Football">Female Hostel Warden</option>
                <option value="Hockey">Sports Coordinator</option>
              </select>

              <Typography>Sports</Typography>
              <select
                name="option1"
                className="block w-full px-4 py-2 mb-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                value={selectedOptions.option1}
                onChange={handleOptionChange}
              >
                <option value="">Sports</option>
                <option value="Cricket">Cricket</option>
                <option value="Football">Football</option>
                <option value="Hockey">Hockey</option>
              </select>

              <Typography>Subject</Typography>
              <select
                name="option2"
                className="block w-full px-4 py-2 mb-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                value={selectedOptions.option2}
                onChange={handleOptionChange}
              >
                <option value="">Your Subject</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
              </select>

              <Typography>Reason</Typography>
              <select
                name="option3"
                className="block w-full px-4 py-2 mb-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                value={selectedOptions.option3}
                onChange={handleOptionChange}
              >
                <option value="">Your Reason</option>
                <option value="Reason 1">Reason 1</option>
                <option value="Reason 2">Reason 2</option>
                <option value="Reason 3">Reason 3</option>
              </select>

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
