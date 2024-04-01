import { Button, Carousel, Typography } from '@material-tailwind/react';
import NavBar from '../components/Navbar';
import { homeData } from '../data';
import AnnouncementsCom from '../components/AnnouncemetsCom';
import UpcomingEvent from './Home/UpcomingEvent';
import SportsSlider from './Home/SportsSlider';
import Typewriter from 'typewriter-effect';
import { useEffect, useState } from 'react';

function Home() {
  const { carouselData } = homeData;
  return (
    <>
      <NavBar />
      <div className="flex ml-3 mt-5 mr-3">
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
          style={{ height: '350px' }}
          className="rounded-xl text-center w-1/2"
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
        <div className="flex w-1/2 items-top justify-center">
          <div className="flex m-5 text-4xl text-customGreen font-bold font-serif ">
            <div className="flex items-center">
              <span>Welcome to </span>
              <div className="ml-3">
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
      <UpcomingEvent />
      <div className="bg-green-300 mt-5">
        <div className=" ml-3">
          <h1>ANNOUNCEMENTS</h1>
          <div className="grid grid-cols-1">
            <div>
              <h1></h1>
            </div>
          </div>
        </div>
      </div>

      <AnnouncementsCom />
      <SportsSlider />
      <Button
        onClick={() => (document.location.href = '/sports')}
        variant="text"
        size="sm"
        color="blue-gray"
        className="mt-5 ml-10 mb-96"
      >
        SPORTS
      </Button>
      {/* <Button
        onClick={() => (document.location.href = '/abc')}
        variant="text"
        size="sm"
        color="blue-gray"
        className="mt-5 ml-10 mb-96"
      >
        Admin
      </Button> */}
    </>
  );
}

export default Home;
