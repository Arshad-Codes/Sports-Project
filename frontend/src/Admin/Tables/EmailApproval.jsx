import React, { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Chip,
} from '@material-tailwind/react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmailApproval() {
  const [excuses, setExcuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchExcuses() {
      try {
        const response = await axios.get(
          'https://ruhunasports.onrender.com/api/admin/getexcuses',
          {
            withCredentials: true,
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

  const handleApprove = async (email) => {
    try {
      await axios.post(
        'https://ruhunasports.onrender.com/api/admin/approveExcuse',
        {
          excuseid: email._id,
        },
        { withCredentials: true }
      );

      setExcuses((prevExcuses) =>
        prevExcuses.map((excuse) =>
          excuse.id === email.id ? { ...excuse, status: 'approved' } : excuse
        )
      );
      toast.success('Email sent successfully. APPROVED', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#4CAF50',
        },
      });
    } catch (error) {
      console.error('Failed to approve excuse', error);
    }
  };

  const handleDisapprove = async (email) => {
    try {
      await axios.post(
        'https://ruhunasports.onrender.com/api/admin/disapproveExcuse',
        {
          excuseid: email._id,
        },
        { withCredentials: true }
      );
      setExcuses((prevExcuses) =>
        prevExcuses.map((excuse) =>
          excuse.id === email.id ? { ...excuse, status: 'disapproved' } : excuse
        )
      );
      toast.success('Successfully DISAPPROVED', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#4CAF50',
        },
      });
    } catch (error) {
      toast.error('Something went wrong', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#FF5252',
        },
      });
    }
  };

  const handleSeeMore = (email) => {
    setSelectedEmail(email);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedEmail(null);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Typography variant="h5" color="blue-gray">
            Loading...
          </Typography>
        </div>
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
                    Subject
                  </th>
                  <th className="border-b border-blue-gray-100 p-4 pb-3 text-left">
                    Date & Time
                  </th>
                  <th className="border-b border-blue-gray-100 p-4 pb-3 text-left">
                    Status
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
                      {email.subject}
                    </td>
                    <td className="border-b border-blue-gray-50 p-4">
                      {email.date}
                    </td>
                    <td className="border-b border-blue-gray-50 p-4">
                      <Chip
                        variant="outlined"
                        color={
                          email.status === 'pending'
                            ? 'blue'
                            : email.status === 'Approved'
                            ? 'green'
                            : 'red'
                        }
                        value={email.status}
                      />
                    </td>
                    <td className="border-b border-blue-gray-50 p-4">
                      <div className="flex space-x-2">
                        {email.status === 'pending' ? (
                          <>
                            <Button
                              color="green"
                              size="sm"
                              onClick={() => handleApprove(email)}
                            >
                              <CheckIcon className="h-5 w-5" />
                            </Button>
                            <Button
                              color="red"
                              size="sm"
                              onClick={() => handleDisapprove(email)}
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </Button>
                            <Button
                              color="blue"
                              size="sm"
                              onClick={() => handleSeeMore(email)}
                            >
                              <InformationCircleIcon className="h-5 w-5" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            color="blue"
                            size="sm"
                            onClick={() => handleSeeMore(email)}
                          >
                            <InformationCircleIcon className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
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
      )}

      <Dialog open={openModal} handler={closeModal} size="lg">
        <DialogHeader>
          <Typography variant="h6" color="blue-gray">
            Excuse Details
          </Typography>
        </DialogHeader>
        <DialogBody divider>
          {selectedEmail && (
            <div className="space-y-4">
              <div>
                <Typography variant="h6">Student Information</Typography>
                <p className="text-sm">
                  <strong>Reg No:</strong> {selectedEmail.regNo}
                </p>
                <p className="text-sm">
                  <strong>Student Name:</strong> {selectedEmail.studentName}
                </p>
              </div>
              <div>
                <Typography variant="h6">Excuse Information</Typography>
                <p className="text-sm">
                  <strong>Receiver:</strong> {selectedEmail.reciever}
                </p>
                <p className="text-sm">
                  <strong>Subject:</strong> {selectedEmail.subject}
                </p>
                <p className="text-sm">
                  <strong>Date:</strong> {selectedEmail.date}
                </p>
                <p className="text-sm">
                  <strong>Status:</strong> {selectedEmail.status}
                </p>
                <p className="text-sm">
                  <strong>Reason:</strong> {selectedEmail.reason}
                </p>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={closeModal}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>

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
    </>
  );
}

export default EmailApproval;
