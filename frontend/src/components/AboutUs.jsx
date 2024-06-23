import React from 'react';

const AboutUs = () => {
  return (
    <div className="flex justify-center items-center w-full animate__animated animate__fadeIn">
      <div className="bg-gray-100 rounded-lg shadow-md mt-10 text-center px-5 sm:px-32 py-10 ">
        <h2 className="text-2xl font-bold text-customGreen mb-4">About Us</h2>
        <p className="text-gray-700 mb-4">
          RuhunaSports is a dedicated platform for sports enthusiasts at Ruhuna
          University. We connect athletes, coaches, and fans within the
          university, providing a central hub for news, updates, and event
          information for various sports.
        </p>
        <p className="text-gray-700 mb-4">
          Our mission is to promote healthy competition and sportsmanship,
          empowering athletes to showcase their talents and achievements. We
          also aim to contribute to the overall development of sports at Ruhuna
          University by fostering a vibrant and supportive community.
        </p>
        <p className="text-gray-700 mb-4">
          RuhunaSports is a student-led initiative, driven by a passion for
          sports and a desire to create a positive impact on the university's
          athletic community. We are constantly striving to improve our platform
          and provide valuable resources and support to our users.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
