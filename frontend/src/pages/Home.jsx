import { Button, Carousel } from '@material-tailwind/react';
import NavBar from '../components/Navbar';
import { homeDatas } from '../datas';

function Home() {
  const { carouselData } = homeDatas;

  return (
    <>
      <NavBar />
      <div className="ml-3 mt-5 mr-3">
        <Carousel
          transition={{ duration: 1.5 }}
          style={{ height: '400px' }}
          className="rounded-xl text-center"
        >
          {carouselData.map((item, index) => (
            <img
              key={index}
              src={item.path}
              alt={item.title}
              className="h-full w-full object-cover"
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

        <Button
          onClick={() => (window.location.href = '/sports')}
          variant="text"
          size="sm"
          color="blue-gray"
          className="mt-5"
        >
          SPORTS
        </Button>
      </div>
    </>
  );
}

export default Home;