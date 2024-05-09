import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Input,
  Navbar,
  Typography,
} from '@material-tailwind/react';
import {
  PaperClipIcon,
  XMarkIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid';
import NavBar from '../components/Navbar';

function EmailPage() {
  const [composeOpen, setComposeOpen] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState(location.state?.role || '');
  const handleComposeOpen = () => {
    setComposeOpen(true);
  };

  const handleComposeClose = () => {
    setComposeOpen(false);
  };

  const handleSendEmail = () => {
    // Logic to send email
    console.log('Sending email...');
    // Clear form fields
    setRecipient('');
    setSubject('');
    setMessage('');
    // Close compose window
    setComposeOpen(false);
  };

  return (
    <>
      <NavBar role={role} />
      <div className="container mx-auto p-4">
        <div className="inbox-header flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">Inbox</h4>
          <Button color="blue" onClick={handleComposeOpen}>
            Compose
          </Button>
        </div>

        {/* Email list */}
        <Card>
          <CardBody>
            {/* Sample email items */}
            <h6 className="font-semibold">Sender Name</h6>
            <h6 className="font-semibold">Subject</h6>
            <p>Preview of email content...</p>
            {/* Add more email items as needed */}
          </CardBody>
        </Card>

        {/* Compose email dialog */}
        {composeOpen && (
          <Card className="compose-dialog mt-4">
            <CardBody>
              <div className="flex justify-between items-center mb-4">
                <h6 className="text-lg font-semibold">New Message</h6>
                <Button color="gray" onClick={handleComposeClose}>
                  <XMarkIcon className="h-6 w-6" />
                </Button>
              </div>
              <div className="space-y-4">
                <Typography>To</Typography>
                <Input
                  type="email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Recipient"
                />
                <Typography>Subject</Typography>
                <Input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                />
                <Typography>Message</Typography>
                <Input
                  type="textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message here..."
                  rows={4}
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  color="transparent"
                  onClick={handleSendEmail}
                  className="mr-2"
                >
                  <PaperClipIcon className="h-6 w-6" />
                </Button>
                <Button color="blue" onClick={handleSendEmail}>
                  <EnvelopeIcon className="h-6 w-6" /> Send
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
}

export default EmailPage;
