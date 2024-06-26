import React from 'react';
import {
  Typography,
  Input,
  Textarea,
  Button,
  Spinner,
} from '@material-tailwind/react';
import { CustomButton } from '../../TailwindCustomComponents/CustomComponents';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { DeleteForever, Edit } from '@mui/icons-material';
import axios from 'axios';
import PopupAchievement from '../../components/PopUpacievements';

const AddAchievements = () => {
  const [achievement, setAchievement] = useState({
    title: '',
    description: '',
    imgUrl: '',
  });
  const [achievementList, setAchievementList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  const handleEdit = (achievement) => () => {
    setCurrentAchievement(achievement);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentAchievement(null);
  };

  const handleSubmitEdit = async (updatedData) => {
    try {
      await axios.put(
        `https://ruhunasports.onrender.com/api/achievement/${updatedData._id}`,
        updatedData,
        {
          withCredentials: true,
        }
      );
      setAchievementList((prevData) =>
        prevData.map((achievement) =>
          achievement._id === updatedData._id ? updatedData : achievement
        )
      );
      toast.success('Achievement updated successfully', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#4CAF50',
        },
      });
      handleClosePopup();
    } catch (error) {
      console.error('Error updating achievement', error);
      toast.error('Failed to update achievement. Please try again', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#FF5252',
        },
      });
    }
  };

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
  }, [achievementList]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const upload = async (file) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'sports'); // Replace 'sports' with your Cloudinary preset

      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/djalshksm/image/upload',
          data
        );

        const { url } = res.data;
        return url;
      } catch (err) {
        console.log(err);
        throw new Error('Failed to upload image');
      }
    };

    try {
      const imgUrl = await upload(file);
      await axios.post(
        'https://ruhunasports.onrender.com/api/achievement/create',
        {
          ...achievement,
          imgUrl,
        },
        { withCredentials: true }
      );

      toast.success('Achievement added successfully!', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#4CAF50',
        },
      });
      // Clear the fields
      setAchievement({
        title: '',
        description: '',
        imgUrl: '',
      });
      setFile(null);
      setPreviewImageUrl(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add Achievement. Please try again.', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#FF5252',
        },
      });
    }
  };

  const handleChange = (e) => {
    setAchievement((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Preview the selected image
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImageUrl(imageUrl);
    } else {
      setPreviewImageUrl(null);
    }
  };

  const handleDelete = (achievement) => async () => {
    try {
      await axios.delete(
        `https://ruhunasports.onrender.com/api/achievement/${achievement.title}`,
        { withCredentials: true }
      );

      toast.success('Achievement deleted successfully', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#4CAF50',
        },
      });
      setAchievementList(
        achievementList.filter(
          (_achievement) => _achievement._id !== achievement._id
        )
      );
    } catch (error) {
      console.error('Error deleting achievement', error);
      toast.error('Failed, Check your internet connection and try again', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          fontSize: '16px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#FF5252',
        },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-3/4 my-10 mx-5">
        <div className="py-10 px-14 w-full mx-auto border border-gray-300 border-t-0 shadow-lg rounded-lg">
          <Typography
            className="flex justify-center"
            variant="h4"
            color="blue-gray"
          >
            Create Achievement
          </Typography>
          <form
            onSubmit={handleSubmit}
            className="mt-8 mb-2 w-100 max-w-screen-lg sm:w-50"
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Title
              </Typography>
              <Input
                size="lg"
                name="title"
                onChange={handleChange}
                value={achievement.title}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Description
              </Typography>
              <Textarea
                name="description"
                onChange={handleChange}
                value={achievement.description}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              ></Textarea>
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Image
              </Typography>
              <Input
                size="lg"
                name="image"
                type="file"
                onChange={handleFileChange}
                value={achievement.imgUrl}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>
            {previewImageUrl && ( // Show the preview image if available
              <img
                src={previewImageUrl}
                alt="Preview"
                className="w-32 h-32 mx-auto mt-2"
              />
            )}

            <CustomButton className="mt-6" fullWidth type="submit">
              Create Achievement
            </CustomButton>
          </form>
        </div>
      </div>

      <div className="mx-5 py-5">
        <h2 className="text-2xl font-bold mb-4">Achievements List</h2>
        {loading ? (
          <div className="flex justify-center">
            <Spinner className="h-16 w-16 text-white" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {achievementList.map((achievement) => (
              <div
                key={achievement._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex h-auto"
              >
                <div className="p-4 w-full">
                  <h3 className="text-xl font-bold mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
                <div className="flex items-center space-x-2 p-4">
                  <Button
                    color="green"
                    size="sm"
                    className="!min-h-[30px] !py-1 !px-3 flex items-center justify-center"
                    onClick={handleEdit(achievement)} // Fix applied here
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    color="red"
                    size="sm"
                    className="!min-h-[30px] !py-1 !px-3 flex items-center justify-center"
                    onClick={handleDelete(achievement)}
                  >
                    <DeleteForever className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <PopupAchievement
        isOpen={isPopupOpen}
        data={currentAchievement}
        onClose={handleClosePopup}
        onSubmit={handleSubmitEdit}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddAchievements;
