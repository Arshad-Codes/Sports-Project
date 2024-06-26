import './EnrolledPage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/Navbar';
import PopupEnrolled from '../components/PopupEnrolled';

function EnrolledPage() {
  const [enrolledSports, setEnrolledSports] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

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
      const response = await axios.get(`http://localhost:8800/api/sport/getSportAnnouncements/${sportId}`);
      setAnnouncements(response.data);
      setIsPopupOpen(true);
    } catch (error) {
      console.error('Failed to fetch announcements', error);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setAnnouncements([]);
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
          data={announcements} 
          onClose={closePopup} 
        />
      </div>
    </>
  );
}

export default EnrolledPage;
