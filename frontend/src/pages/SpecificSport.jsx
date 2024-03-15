import { Button } from "@material-tailwind/react";
import NavBar from "../components/Navbar";
import { styled } from "@mui/system";

const CustomButton = styled(Button)({
  color: "white",
  backgroundColor: "#09473F",
  variant: "gradient",
});

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
              src="/src/assests/cricket/cricket_3.jpg"
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
              <CustomButton
                onClick={() => (window.location.href = "/enrolled")}
                className="mt-5 w-36"
              >
                Enrol
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-customGreen mt-10">
        <h1 className="text-white ml-4 font-bold">Faculty Team</h1>
        <div className="grid grid-cols-2 mt-4">
          {/* Left Box for Boys Team Members */}
          <div className="p-3 border-black border rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Boys Team Members</h2>
            <hr></hr>
            <ul className="mt-4">
              <li>Player 1</li>
              <li>Player 2</li>
              <li>Player 3</li>
              {/* Add more players as needed */}
            </ul>
          </div>
          {/* Right Box for Girls Team Members */}
          <div className="p-3 border-black border rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Girls Team Members</h2>
            <hr></hr>
            <ul className="mt-4">
              <li>Player 1</li>
              <li>Player 2</li>
              <li>Player 3</li>
              {/* Add more players as needed */}
            </ul>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
}

export default SpecificSport;
