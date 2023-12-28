// EnrolledPage.js
import { useState } from 'react';
import { Button } from '@mui/material';
import EmailPopup from './EmailPopup';

const EnrolledPage = () => {
  const [isEmailPopupOpen, setEmailPopupOpen] = useState(false);

  const handleEmailButtonClick = () => {
    setEmailPopupOpen(true);
  };

  const handleEmailPopupClose = () => {
    setEmailPopupOpen(false);
  };

  return (
    <div>
      <div>EnrolledPage</div>
      <Button
        onClick={handleEmailButtonClick}
        variant="contained"
        color="primary"
      >
        Email
      </Button>
      <EmailPopup isOpen={isEmailPopupOpen} onClose={handleEmailPopupClose} />
    </div>
  );
};

export default EnrolledPage;
