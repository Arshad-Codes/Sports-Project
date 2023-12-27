import { Button } from '@material-tailwind/react';
import NavBar from '../components/Navbar';

function SpecificSport() {
  return (
    <>
      <NavBar />
      <div>
        <div className="mt-5 bg-customGreen">
          <h1 className="text-white p-2 text-2xl">CRICKET</h1>
        </div>
        <div className="flex flex-row mt-5 bg-blue-gray-100">
          <div className="basis-1/4">
            <img
              className="h-96 w-full"
              src="https://wallpaperset.com/w/full/c/c/1/239835.jpg"
            />
          </div>
          <div className="basis-3/4 flex items-center justify-center">
            <div className="text-center">
              <h1 className="p-10 font-medium">
                Lorem ipsum dolor sit amet consectetur. Egestas aliquam nibh in
                in neque nisl elit risus suspendisse. Est sit mi odio quis urna
                elit ut. Sed semper arcu lectus aliquet sed faucibus. Eu massa a
                tortor nisl rhoncus quam.
              </h1>
              <Button className="mt-5 w-36">Enrol</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-customGreen mt-10">
        <h1 className="text-white">Faculty Team</h1>
        <div>
          <div className="grid grid-cols-2">
            <h1>Hiii</h1>
            <h1>Hiii</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecificSport;