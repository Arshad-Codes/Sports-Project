import './EnrolledPage.css';
import { Announcements } from '../data';
import NavBar from '../components/Navbar';

function EnrolledPage() {

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const { announcementsData } = Announcements;
  return (
    <>
      <div>
      <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white 
                      lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
                     Welcome {currentUser.firstName +" "+ currentUser.lastName} !!! </h1>
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

export default EnrolledPage;
