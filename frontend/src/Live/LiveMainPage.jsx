import React, { useState } from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const LiveMainPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const role = currentUser?.role || '';

  const predefinedUsername = 'host';
  const predefinedPassword = '123456';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      form.username === predefinedUsername &&
      form.password === predefinedPassword
    ) {
      console.log('Login successful');
      setShowModal(false);
      navigate('/live');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <>
      <NavBar role={role} />
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-10">
        <h1 className="text-4xl font-bold mb-8">Live Streaming</h1>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            onClick={() => setShowModal(true)}
          >
            Create Live Streaming
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            onClick={() => navigate('/live')}
          >
            Join Live Streaming
          </button>
        </div>
      </div>
      <Footer />

      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4">
              <div className="flex justify-between items-center pb-3">
                <h3 className="text-2xl font-bold">Login</h3>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default LiveMainPage;
