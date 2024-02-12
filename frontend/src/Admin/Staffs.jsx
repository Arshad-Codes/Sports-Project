import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const SportsPage = () => {
  const [sports, setSports] = useState('');
  const sportsRef = useRef();

  useEffect(() => {
    sportsRef.current.focus();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white ">
      <div className="p-10 w-full max-w-md border border-gray-400 shadow-md rounded-lg">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold">Add Sports Coordinator</h1>
        </div>
        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-md shadow-sm">
              <label className="sr-only">First Name</label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="rounded-md shadow-sm">
              <label className="sr-only">Last Name</label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="rounded-md shadow-sm">
            <label className="sr-only">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="rounded-md shadow-sm">
            <label className="sr-only">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="rounded-md shadow-sm">
            <label className="sr-only">Contact</label>
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="Contact"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="rounded-md shadow-sm">
            <label className="sr-only">Sports</label>
            <select
              ref={sportsRef}
              onChange={(e) => setSports(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Sport</option>
              <option value="cricket">Cricket</option>
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
            </select>
          </div>
          <div className="rounded-md shadow-sm">
            <label className="sr-only">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SportsPage;
