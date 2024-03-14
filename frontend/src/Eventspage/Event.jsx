import React, { useState, useRef } from "react";
import NavBar from "../components/Navbar";
import EventImage1 from "./event1.jpg";
import EventImage2 from "./event2.jpg";
import EventImage3 from "./event3.jpg";
import EventImage4 from "./event4.jpg";
import EventImage5 from "./event5.jpg";
import EventImage6 from "./event6.jpg";
import EventImage7 from "./event7.jpg";

const events = [
  { id: 1, image: EventImage1, title: "Event 1", caption: "Volleyball Tournament 2024" },
  { id: 2, image: EventImage2, title: "Event 2", caption: "Chess Tournament 2024" },
  { id: 3, image: EventImage3, title: "Event 3", caption: "Hockey Tournament 2024" },
  { id: 4, image: EventImage4, title: "Event 4", caption: "Badminton Tournament 2024" },
  { id: 5, image: EventImage5, title: "Event 5", caption: "Table Tennis Tournament 2024" },
  { id: 6, image: EventImage6, title: "Event 6", caption: "CEE Cricket Tournament 2024" },
  { id: 7, image: EventImage7, title: "Event 7", caption: "Freshers meet 2024" }
];

function Event() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const handleNextClick = () => {
    const containerWidth = containerRef.current.offsetWidth;
    const imagesWidth = events.length * 320; // Assuming each image has a width of 320px

    
    const maxScroll = imagesWidth - containerWidth;

    if (scrollPosition > -maxScroll) {
      setScrollPosition((prevPosition) => Math.max(prevPosition - 100, -maxScroll));
    }
  };

  const handlePrevClick = () => {
    if (scrollPosition < 0) {
      setScrollPosition((prevPosition) => Math.min(prevPosition + 100, 0));
    }
  };

  return (
    <>
      <NavBar />
      <div className="mt-10 mx-10">
        <div className="bg-customGreen p-4 rounded-lg relative" ref={containerRef}>
          <h2 className="text-xl font-bold text-white mb-4">Upcoming Events...</h2>
          <div className="flex overflow-x-hidden" style={{ transform: `translateX(${scrollPosition}px)` }}>
            {events.map((event) => (
              <div key={event.id} className="flex flex-col items-center mr-4">
                <div className="border-black border p-2 rounded-lg" style={{ width: "320px" }}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="rounded-xl mb-2"
                    style={{ width: "100%" }}
                  />
                  <p className="text-center text-white">{event.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handlePrevClick}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white px-2 py-1 rounded-md focus:outline-none"
            style={{ zIndex: "10", display: scrollPosition === 0 ? "none" : "block" }}
          >
            {"<"}
          </button>
          <button
            onClick={handleNextClick}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white px-2 py-1 rounded-md focus:outline-none"
            style={{ zIndex: "10" }}
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Event;
