import { CustomButton } from '../../TailwindCustomComponents/CustomComponents';
import { useNavigate } from 'react-router-dom';

function LoginPopup({ onClose }) {
  const navigate = useNavigate();
  const handleButtonClick = (role) => {
    console.log(`Clicked ${role}`);
    onClose();
    navigate('/login', { state: { role } });
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50 w-screen h-screen">
      <div className="bg-white w-2/6 p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-end">
          <button
            onClick={onClose}
            className="top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <h2 className="text-black text-xl font-semibold mb-4">
          Choose Your Role
        </h2>
        <div className=" grid grid-cols-1 gap-4">
          <CustomButton onClick={() => handleButtonClick('Admin')}>
            Admin
          </CustomButton>
          <CustomButton onClick={() => handleButtonClick('Sport Coordinator')}>
            Sports Coordinator
          </CustomButton>
          <CustomButton onClick={() => handleButtonClick('Student')} block>
            Student
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
