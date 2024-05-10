import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentProfile = () => {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    return <div>Loading...</div>;
  }

    // Function to format the date
   const Dateformat = (dateString) => {
      const date = new Date(dateString);
      // Extract the date components (year, month, day)
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      // Return the formatted date string (YYYY-MM-DD)
      return `${year}-${month}-${day}`;
    };
  return (
    <section>
      {/* Cover Image */}
      <img
        src="https://wallpapercave.com/wp/wp4041617.jpg"
        alt="User Cover"
        className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
      />

      {/* Profile Image and Full Name */}
      <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
        <img
          src="https://img.freepik.com/premium-vector/default-male-user-profile-icon-vector-illustration_276184-168.jpg?w=360"
          alt="User Profile"
          className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
        />

        <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white 
                      lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
                      {currentUser.firstName +" "+ currentUser.lastName}        
        </h1>
      </div>

      {/* Description and Details */}
      <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
        {/* Description */}
        <p className="w-fit text-gray-700 dark:text-gray-400 text-md">
        Hey there! I'm {currentUser.firstName +" "+ currentUser.lastName}, an avid sports enthusiast with a passion for all things athletic. From the thrill of scoring goals 
        on the soccer field to the precision of sinking that perfect three-pointer on the basketball court, sports have always been my playground. 
        Whether it's cheering on my favorite teams, analyzing game strategies, or hitting the gym for a workout session, I'm always in the zone. 
        Let's dive into the world of sports together and celebrate the adrenaline, camaraderie, and sheer excitement that it brings!        
        </p>

        {/* Details */}
        <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
          <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
            {/* First Name, Last Name, Date Of Birth, Email */}
            <div className="w-full">
              <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                <div className="flex flex-col pb-3">
                  <dt className="mb-1 text-xl  md:text-lg dark:text-gray-400">First Name</dt>
                  <dd className="text-gray-500 font-semibold">{currentUser.firstName}</dd>
                </div>
                <div className="flex flex-col py-3">
                  <dt className="mb-1 text-xl md:text-lg dark:text-gray-400">Last Name</dt>
                  <dd className="text-gray-500 font-semibold">{currentUser.lastName}</dd>
                </div>
                <div className="flex flex-col py-3">
                  <dt className="mb-1 text-xl md:text-lg dark:text-gray-400">Date Of Birth</dt>
                  <dd className="text-gray-500 font-semibold">{Dateformat(currentUser.dateofBirth)}</dd>
                </div>
                <div className="flex flex-col py-3">
                  <dt className="mb-1 text-xl md:text-lg dark:text-gray-400">Email</dt>
                  <dd className="text-gray-500 font-semibold">{currentUser.email}</dd>
                </div>
              </dl>
            </div>
            {/* Reg No, Nic Number, My Achievements, Created At */}
            <div className="w-full">
              <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white  gap-2 dark:divide-gray-700 ">
                <div className="flex flex-col pb-3">
                  <dt className="mb-1 text-xl  md:text-lg dark:text-gray-400">Reg No</dt>
                  <dd className="text-gray-500 font-semibold">{currentUser.regNo}</dd>
                </div>
                <div className="flex flex-col pt-3">
                  <dt className="mb-1 text-xl md:text-lg dark:text-gray-400">Nic Number</dt>
                  <dd className="text-gray-500 font-semibold">{currentUser.nicNo}</dd>
                </div>
                <div className="flex flex-col pt-3">
                  <dt className="mb-1 text-xl md:text-lg dark:text-gray-400">My Achievements</dt>
                  <dd className="text-gray-500 font-semibold">{currentUser.achievements}</dd>
                </div>
                <div className="flex flex-col pt-3">
                  <dt className="mb-1 text-xl md:text-lg dark:text-gray-400">Created At:</dt>
                  <dd className="text-gray-500 font-semibold">{Dateformat(currentUser.createdAt)}</dd>
                </div>
              </dl>
            </div>
          </div>
          </div>
          </div>
          </section>
  );
};

export default StudentProfile;
