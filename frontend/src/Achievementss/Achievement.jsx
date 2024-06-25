import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/Navbar';
import chess1 from './chess.jpg';
import volley1 from './volley.jpg';
import { Carousel } from '@material-tailwind/react';
import { homeData } from '../data';

function Achievement() {
  const { achievementData } = homeData;
  const [achievementList, setAchievementList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'https://ruhunasports.onrender.com/api/achievement/'
        );
        setAchievementList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <NavBar />

      <h1 className="text-center text-customGreen mt-6 text-4xl font-Inika font-bold">
        Our Achievements
      </h1>
      <br></br>

      <div className="mx-20 mt-5">
        <Carousel
          transition={{ duration: 1.5 }}
          style={{ height: '600px' }}
          className="rounded-xl text-center"
        >
          {achievementData.map((item, index) => (
            <img
              key={index}
              src={item.path}
              alt={item.title}
              className="rounded-xl h-full w-full object-fill"
            />
          ))}
        </Carousel>
      </div>
      <br></br>
      <p className="text-lg mt-4 mb-10 mx-10">
        Welcome to the University of Ruhuna's Engineering Faculty Sports
        Achievements page—where we're not just brainy, but also super sporty!
        Our students don't just excel in the classroom; they're also champions
        on the field. From winning exciting tournaments to breaking records, our
        sports teams are like superheroes in action. Whether it's soccer,
        cricket, or any sport you can think of, we're out there having a blast
        and bringing home trophies. We believe in the power of teamwork,
        discipline, and, of course, having a ton of fun while playing. So, join
        us in celebrating our victories and the joy of sports at the University
        of Ruhuna's Engineering Faculty! Here you can explore our
        achivements.......
      </p>
      <div className="">
        <hr className="border-gray-400 my-10 " />

        <div className=" ml-3 mt-4">
          <h1 className="text-red-700 mt-3 text-2xl font-Inika font-bold mx-6">
            Explore our achievements here...
          </h1>
          <div className="grid grid-cols-1">
            <br></br>

            {/* Announcement Box 1 */}
            <div className="border border-gray-600 rounded-xl p-4 flex items-center bg-gray-300 mx-10 mt-5">
              <img
                className="w-45 h-40  mr-4 rounded-xl border border-gray-800"
                src={volley1}
                alt="Volleyball tournament"
              />
              <div>
                <h2 className="text-lg font-semibold mx-10 ">
                  Volleyball tournament 2024 – asjdbjhbdh sjdwhdundn
                  jnsjnjsnnsaj ajsnuw.
                </h2>

                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mx-10 mr-2 mt-4 mb-4 text-gray-800"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 4a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 01-2 0V5a1 1 0 011-1zM8 12a1 1 0 012 0v3a1 1 0 11-2 0v-3zM10 14a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-gray-800">March 10, 2024</p>
                </div>

                <p className="text-gray-900 mx-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  auctor sapien in porta varius.
                </p>
                <button className="bg-customGreen hover:bg-red-800 text-white font-semibold py-1 px-3 rounded-full mt-4 mb-4 mx-10">
                  See more...
                </button>
              </div>
            </div>
            <br></br>

            {/* Announcement Box 2 */}
            <div className="border border-gray-600 rounded-xl p-4 flex items-center bg-gray-300 mx-10">
              <img
                className="w-45 h-40 mr-4 rounded-xl border border-gray-800"
                src={chess1}
                alt="Chess tournament"
              />
              <div>
                <h2 className="text-lg font-semibold mx-10">
                  Chess tournament 2024 – asjdbjhbdh sjdwhdundn jnsjnjsnnsaj
                  ajsnuw.
                </h2>

                <div className="flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5  mx-10 mr-2 mt-4 mb-4 text-gray-800"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 4a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 01-2 0V5a1 1 0 011-1zM8 12a1 1 0 012 0v3a1 1 0 11-2 0v-3zM10 14a1 1 0 100 2 1 1 0 000-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-gray-800">March 10, 2024</p>
                </div>

                <p className="text-gray-900 mx-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  auctor sapien in porta varius.
                </p>
                <button className="bg-customGreen hover:bg-red-800 text-white font-semibold py-1 px-3 rounded-full mt-4 mb-4 mx-10">
                  See more...
                </button>
              </div>
            </div>

            <br></br>

            {loading ? (
              <p>Loading...</p>
            ) : (
              achievementList.map((achievement, index) => (
                <div
                  key={index}
                  className="border border-gray-600 rounded-xl p-4 flex items-center bg-gray-300 mx-10 mt-5"
                >
                  <img
                    className="w-45 h-40 mr-4 rounded-xl border border-gray-800"
                    src={achievement.imgUrl}
                    alt={achievement.title}
                  />
                  <div>
                    <h2 className="text-lg font-semibold mx-10 ">
                      {achievement.title}
                    </h2>

                    <div className="flex items-center mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mx-10 mr-2 mt-4 mb-4 text-gray-800"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 4a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 01-2 0V5a1 1 0 011-1zM8 12a1 1 0 012 0v3a1 1 0 11-2 0v-3zM10 14a1 1 0 100 2 1 1 0 000-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-gray-800">
                        {achievement.createdAt}
                      </p>
                    </div>

                    <p className="text-gray-900 mx-10">
                      {achievement.description}
                    </p>
                    <button className="bg-customGreen hover:bg-red-800 text-white font-semibold py-1 px-3 rounded-full mt-4 mb-4 mx-10">
                      See more...
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <br></br>
        </div>
      </div>
    </>
  );
}

export default Achievement;
