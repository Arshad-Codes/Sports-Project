import './AnnouncementsCom.css';
import { Announcements } from '../data';

function AnnouncementsCom() {
  const { announcementsData } = Announcements;
  return (
    <>
      <div>
        <div className="main-announcement">
          {announcementsData.map((item, index) => (
            <div className="announcement" key={index}>
              <div className="announcement-content">
                <h1>{item.heading}</h1>
                <p className="date">Posted on: {item.date.toLocaleString()}</p>
                <p>{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AnnouncementsCom;
