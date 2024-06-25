import React from "react";

const AboutUs = () => {
  return (
    <div className="flex justify-center items-center w-full animate__animated animate__fadeIn">
      <div className="bg-gray-100 rounded-lg shadow-md mt-10 text-start px-5 sm:px-32 py-10 ">
        <h2 className="text-2xl font-bold text-customGreen mb-4">About Us</h2>
        <p className="text-gray-700 mb-4">
          The students of the Faculty of Engineering take actively take part in
          sports activities. The students can take part in 21 sports that are
          facilitated within the university. The faculty premises has a well
          equipped weight training room, a multipurpose play ground for
          Athletics Elle, Hockey Rugger, Football, Cricket Road Race, Netball,
          Base ball , and facilities for Badminton, Table Tennis, Chess,
          Basketball, Carrom, Karate. At university level annual sports events
          such as Inter-Faculty and Inter-University tournaments are held. In
          addition to these, a two weeks long University Sports Festival named
          SLUG is held at a selected University once in every 3 years. Students
          are also encouraged to participate in the World University Sports
          Festival which is held once in every two years. .
        </p>
        <p className="text-gray-700 mb-4">
          Engineering faculty students are among the best performers in
          interfaculty tournaments. Many of our best sportsmen and women have
          shown their talents in many interuniversity level games enabling them
          to represent the national university teams as well as to take part in
          world university games. At the end of each year, a Colors Award
          Ceremony is held and those who excel in different sports activities at
          tournaments and meets are awarded colours in which many of our sports
          men and women receive university colours.
        </p>
        <p className="text-gray-700 mb-4">
          Past and present sports enthusiasts of the faculty have formed the
          Engineering Faculty Sports Club. Together they are working hard for
          the betterment of the sports in the engineering faculty through the
          development of sportsmen and women as well as sports infrastructure
          within the faculty.
        </p>
      </div>
      <script
        src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
        type="module"
      ></script>
    </div>
  );
};

export default AboutUs;
