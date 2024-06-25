import React, { useEffect } from "react";
import { useState } from "react";
import {
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from '@material-tailwind/react';
import axios from "axios";





function EmailApproval() {

  const [excuses, setExcuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExcuses() {
      try {
        const response = await axios.get(
          'http://localhost:8800/api/admin/getexcuses',
          {
            withCredentials:true
          }
        );
        setExcuses(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchExcuses();
  }, []);

        


  const handleApprove = (id) => {
    console.log(`Email ${id} approved.`);
  };

  const handleDisapprove = (id) => {
    console.log(`Email ${id} disapproved.`);
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <Card className="h-full w-full mb-5 border border-gray-300 border-t-0 shadow-lg rounded-lg">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8">
          <Typography variant="h5" color="blue-gray">
            Email Requests
          </Typography>
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
              <th className="border-b border-blue-gray-100 p-4 pb-3 text-left">
                Reg No
              </th>
              <th className="border-b border-blue-gray-100 p-4 pb-3 text-left">
                Student Name
              </th>
              <th className="border-b border-blue-gray-100 p-4 pb-3 text-left">
                Subject
              </th>
              <th className="border-b border-blue-gray-100 p-4 pb-3 text-left">
                Date & Time
              </th>
              <th className="border-b border-blue-gray-100 p-4 pb-3 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {excuses.map((email) => (
              <tr key={email.id}>
                <td className="border-b border-blue-gray-50 p-4">
                  {email.regNo}
                </td>
                <td className="border-b border-blue-gray-50 p-4">
                  {email.studentName}
                </td>
                <td className="border-b border-blue-gray-50 p-4">
                  {email.subject}
                </td>
                <td className="border-b border-blue-gray-50 p-4">
                  {email.date}
                </td>
                <td className="border-b border-blue-gray-50 p-4">
                  <div className="flex space-x-2">
                    <Button
                      color="green"
                      size="sm"
                      onClick={() => handleApprove(email.id)}
                    >
                      <CheckIcon className="h-5 w-5" />
                    </Button>
                    <Button
                      color="red"
                      size="sm"
                      onClick={() => handleDisapprove(email.id)}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
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

export default EmailApproval;
