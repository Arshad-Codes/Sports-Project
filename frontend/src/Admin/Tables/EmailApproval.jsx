import React from "react";
import {
  MagnifyingGlassIcon,
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

const emails = [
  { id: 1, sender: "john@gmail.com", subject: "Practice Schedule", date: "2024-05-30" },
  { id: 2, sender: "jane@gmail.com", subject: "Project Update", date: "2024-05-29" },
  { id: 3, sender: "tim@gmail.com", subject: "Inter Faculty Football Match", date: "2024-05-28" },
];

function EmailApproval() {
  return (
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
              <th className="border-b border-blue-gray-100 p-4 pb-3 text-left">Sender</th>
              <th className="border-b border-blue-gray-100 p-4 pb-3 text-left">Subject</th>
              <th className="border-b border-blue-gray-100 p-4 pb-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email.id}>
                <td className="border-b border-blue-gray-50 p-4">{email.sender}</td>
                <td className="border-b border-blue-gray-50 p-4">{email.subject}</td>
                <td className="border-b border-blue-gray-50 p-4">{email.date}</td>
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
