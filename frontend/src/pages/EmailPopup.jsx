// EmailPopup.js
import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button, TextField } from '@mui/material';

const EmailPopup = ({ isOpen, onClose }) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          {/* Dialog Overlay */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* Dialog Content */}
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Compose Email
              </Dialog.Title>
              <Button onClick={onClose} color="primary">
                Close
              </Button>
            </div>

            <div className="mb-4">
              <TextField label="To" fullWidth />
            </div>

            <div className="mb-4">
              <TextField label="Subject" fullWidth />
            </div>

            <div className="mb-4">
              <TextField label="Body" multiline rows={4} fullWidth />
            </div>

            <div className="text-right">
              <Button variant="contained" color="primary">
                Send
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EmailPopup;
