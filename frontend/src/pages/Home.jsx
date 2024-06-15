import { Carousel } from '@material-tailwind/react';
import NavBar from '../components/Navbar';
import { homeData } from '../data';
import SportsSlider from './Home/SportsSlider';
import Typewriter from 'typewriter-effect';
import WhyRuhunaSport from '../components/WhyRuhunaSport';
import Footer from '../components/Footer';
import AboutUs from '../components/AboutUs';

function Home() {
  // const location = useLocation();
  // const [role, setRole] = useState(location.state?.role || '');
  const { carouselData } = homeData;

  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row ml-3 mt-5 mr-3">
        {' '}
        <Carousel
          transition={{ duration: 1.5 }}
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-20 flex -translate-x-2/4 gap-2">
              {new Array(length).fill('').map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          style={{ height: '400px' }}
          className="rounded-xl text-center w-full md:w-1/2"
          autoplay
          autoplayDelay={5000}
          loop={true}
        >
          {carouselData.map((item, index) => (
            <img
              key={index}
              src={item.path}
              alt={item.title}
              className="h-full w-full object-fill"
            />
          ))}
        </Carousel>
        <div className="flex flex-col justify-center items-center md:w-1/2">
          {' '}
          <div className="flex m-5 text-4xl text-customGreen font-bold font-serif ">
            <div className="flex-col items-center ">
              <span>Welcome to </span>
              <div className="ml-10">
                <Typewriter
                  options={{
                    loop: true,
                    cursor: '|',
                    deleteSpeed: 0.3,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString('RuhunaSports!')
                      .pauseFor(3000)
                      .deleteAll()
                      .start();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhyRuhunaSport />
      <SportsSlider />

      {/* <div className="bg-green-300 mt-5">
        <div className=" ml-3">
          <h1>ANNOUNCEMENTS</h1>
          <div className="grid grid-cols-1">
            <div>
              <h1></h1>
            </div>
          </div>
        </div>
      </div> */}

      {/* <AnnouncementsCom /> */}

      {/* <UpcomingEvent /> */}
      <AboutUs />
      <Footer />
    </>
  );
}

export default Home;
