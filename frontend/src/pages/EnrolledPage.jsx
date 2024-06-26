import './EnrolledPage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/Navbar';
import PopupEnrolled from '../components/PopupEnrolled';

function EnrolledPage() {
  const [enrolledSports, setEnrolledSports] = useState([]);
  const [announcement, setAnnouncement] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  console.log(announcement);

  useEffect(() => {
    const fetchEnrolledSports = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/student/getEnrolledSports/${currentUser._id}`);
        setEnrolledSports(response.data);
      } catch (error) {
        console.error('Failed to fetch enrolled sports', error);
      }
    };

    fetchEnrolledSports();
  }, [currentUser._id]);

  const handleSportClick = async (sportId) => {
    try {
      const response = await axios.get(`http://localhost:8800/api/announcement/getAnnouncementforSport/${sportId}`);
      console.log('Fetched announcement:', response.data);
      setAnnouncement(response.data);
      setIsPopupOpen(true); 
    } catch (error) {
      console.error('Failed to fetch announcement', error);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setAnnouncement(null);
  };

  return (
    <>
      <NavBar />
      <div>
        <h1 className="welcome-text">
          Welcome {currentUser.firstName + " " + currentUser.lastName} !!!
        </h1>
        <div className="main-sports">
          {enrolledSports.map((sport) => (
            <div 
              className="sport" 
              key={sport._id} 
              onClick={() => handleSportClick(sport._id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="sport-content">
                <img src={sport.imageUrl} alt={sport.name} className="sport-image" />
                <h1>{sport.name}</h1>
              </div>
            </div>
          ))}
        </div>
        <PopupEnrolled 
          isOpen={isPopupOpen} 
          data={announcement} 
          onClose={closePopup} 
        />
      </div>
    </>
  );
}

export default EnrolledPage;
