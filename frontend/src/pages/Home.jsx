import { Carousel } from '@material-tailwind/react';
import NavBar from '../components/Navbar';
import { homeData } from '../data';
import SportsSlider from './Home/SportsSlider';
import Typewriter from 'typewriter-effect';
import WhyRuhunaSport from '../components/WhyRuhunaSport';
import Footer from '../components/Footer';
import AboutUs from '../components/AboutUs';

function Home() {
  const { carouselData } = homeData;

  return (
    <>
      <NavBar />
      <div className="relative">
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
          // style={{ height: '600px' }}
          className=" w-full relative"
          autoplay
          autoplayDelay={5000}
          loop={true}
        >
          {carouselData.map((item, index) => (
            <div key={index} className="relative">
              <img
                src={item.path}
                alt={item.title}
                className="h-full w-full object-cover "
              />
              <div className="absolute inset-0 bg-black/70 " />
            </div>
          ))}
        </Carousel>
        <div className="absolute top-28 sm:top-1/3 md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold z-30">
          <span className="text-xl sm:text-2xl  md:text-4xl lg:text-6xl">
            Faculty Of Engineering University Of Ruhuna{' '}
          </span>
          <div className="mt-5 text:2xl sm:text-3xl md:text-4xl ">
            <Typewriter
              options={{
                loop: true,
                cursor: '|',
                deleteSpeed: 0.3,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(' 𝕽𝖚𝖍𝖚𝖓𝖆 𝕾𝖕𝖔𝖗𝖙𝖘!')
                  .pauseFor(3000)
                  .deleteAll()
                  .start();
              }}
            />
          </div>
        </div>
      </div>
      <WhyRuhunaSport />
      <SportsSlider />
      <AboutUs />
      <Footer />
    </>
  );
}

export default Home;
