import { Button, Carousel } from '@material-tailwind/react';
import NavBar from '../components/Navbar';
import { homeData } from '../data';
import AnnouncementsCom from '../components/AnnouncemetsCom';
import CardsWithSeeMore from '../components/CardsWithSeeMore';

function Home() {
  const { carouselData } = homeData;

  return (
    <>
      <NavBar />
      <div className="ml-3 mt-5 mr-3">
        <Carousel
          transition={{ duration: 1.5 }}
          style={{ height: '500px' }}
          className="rounded-xl text-center"
        >
          {carouselData.map((item, index) => (
            <img
              key={index}
              src={item.path}
              alt={item.title}
              className="h-full w-full object-fill"
            />
          ))}

          {/* <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="h-full w-full object-cover"
          /> */}
        </Carousel>
      </div>
      <div>
        <CardsWithSeeMore />
      </div>
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
