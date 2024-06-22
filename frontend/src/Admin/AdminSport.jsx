import { DeleteForever, Edit } from '@mui/icons-material';
import { CustomButton } from '../TailwindCustomComponents/CustomComponents';
import {
  Button,
  Card,
  Input,
  Spinner,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminSport() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchSports() {
      try {
        const response = await axios.get(
          'http://localhost:8800/api/sport/getSports'
        );
        setSportsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sports:', error);
        setLoading(false);
      }
    }
    fetchSports();
  }, [sportsData]);
  const handleChange = (e) => {
    setUser((prev) => {
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

  const handleCreate = async (e) => {
    e.preventDefault();
    const upload = async (file) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'sports');

      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/djalshksm/image/upload',
          data
        );

        const { url } = res.data;
        return url;
      } catch (err) {
        console.log(err);
        // setError(err.response.data);
      }
    };

    const imgUrl = await upload(file);

    try {
      await axios.post(
        'http://localhost:8800/api/sport/createsport',
        {
          ...user,
          imageUrl: imgUrl,
        },
        {
          withCredentials: true,
        }
      );
      setUser({
        name: '',
        description: '',
        imageUrl: '',
      });
      setFile(null);
      setPreviewImageUrl(null);
      toast.success('Sport added successfully!', {
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
    } catch (err) {
      console.log(err);
      toast.error('Failed to add sport. Please try again', {
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

  const handleDelete = (sport) => async () => {
    try {
      await axios.delete(
        `http://localhost:8800/api/sport/deleteSport/${sport._id}`,

        { withCredentials: true }
      );

      toast.success('Sport deleted successfully', {
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
      setSportsData(setSportsData.filter((_sport) => _sport._id !== sport._id));
    } catch (error) {
      console.error('Error deleting sport', error);
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

  const handleEdit = () => {};

  return (
    <div>
      <div className="flex items-center justify-center h-3/4 my-10 mx-5">
        <Card
          className="py-10 px-14 flex w-full mx-auto border border-gray-300 border-t-0 shadow-lg rounded-lg"
          color="transparent"
          shadow={true}
        >
          <Typography
            className="flex justify-center"
            variant="h4"
            color="blue-gray"
          >
            Add a Sport
          </Typography>
          <form
            className="mt-8 mb-2 w-100 max-w-screen-lg sm:w-50"
            onSubmit={handleCreate}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Name
              </Typography>
              <Input
                size="lg"
                name="name"
                onChange={handleChange}
                value={user.name}
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
                value={user.description}
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
                value={user.imageUrl}
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
              Create Sport
            </CustomButton>
          </form>
        </Card>
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Sports List</h2>
        {loading ? (
          <div className="flex justify-center">
            <Spinner className="h-16 w-16 text-white" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {sportsData.map((sport) => (
              <div
                key={sport._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex h-72"
              >
                <img
                  src={sport.imageUrl}
                  alt={sport.name}
                  className="w-2/6 h-auto object-cover"
                />
                <div className="p-4 w-3/6">
                  <h3 className="text-xl font-bold mb-2">{sport.name}</h3>
                  <p className="text-gray-600">{sport.description}</p>
                </div>
                <div className="flex items-center space-x-2 p-4 w-1/6">
                  <Button
                    color="green"
                    size="sm"
                    className="!min-h-[30px] !py-1 !px-3 flex items-center justify-center"
                    onClick={handleEdit}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    color="red"
                    size="sm"
                    className="!min-h-[30px] !py-1 !px-3 flex items-center justify-center"
                    onClick={handleDelete(sport)}
                  >
                    <DeleteForever className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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
}

export default AdminSport;
