import { Typography } from '@material-tailwind/react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function CardsWithSeeMore({ data }) {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    setScrollPosition(scrollPosition + container.offsetWidth);
    container.scrollTo({
      left: scrollPosition + container.offsetWidth,
      behavior: 'smooth',
    });
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    setScrollPosition(scrollPosition - container.offsetWidth);
    container.scrollTo({
      left: scrollPosition - container.offsetWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="mx-3 mt-2">
      <div className="flex items-center">
        <button className="text-white" onClick={scrollLeft}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div
          className="flex overflow-x-scroll"
          ref={scrollContainerRef}
          style={{ overflowX: 'scroll', scrollbarWidth: 'none' }}
        >
          <div className="flex flex-nowrap">
            {data.map((item, index) => (
              <div key={index} className="inline-block pr-10">
                <Link to={`/sports/${item.name}`}>
                  <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg rounded-b-none shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <img
                      className="w-full h-64"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-center h-10 bg-white text-black text-center rounded-b-lg">
                      <Typography className="font-semibold text-lg">
                        {item.name}
                      </Typography>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button className="text-white" onClick={scrollRight}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CardsWithSeeMore;
