import Footer from '../components/Footer';
import NavBar from '../components/Navbar';
const LiveMainPage = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const role = currentUser?.role || '';
  return (
    <>
      <NavBar role={role} />
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center mb-0">
        <h1 className="text-4xl font-bold mb-8">Live Streaming</h1>
        <div className="flex flex-col space-y-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
            Create Live Streaming
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
            Join Live Streaming
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LiveMainPage;
