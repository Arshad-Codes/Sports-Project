import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import CardsWithSeeMore from '../../components/CardsWithSeeMore';
import { Link } from 'react-router-dom';
import { FormatIndentIncreaseOutlined } from '@mui/icons-material';
import axios from 'axios';
import { Spinner } from '@material-tailwind/react';

function SportsSlider() {
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchSports() {
      try {
        const response = await axios.get(
          'https://ruhunasports.onrender.com/api/sport/getSports'
        );
        setSportsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    }
    fetchSports();
  }, []);
  return (
    <div className="bg-customGreen mt-10 text-white">
      <Typography className="mx-3 pt-2">SPORTS</Typography>
      {loading ? (
        <div className="flex justify-center">
          <Spinner className="h-16 w-16 text-white" />{' '}
        </div>
      ) : (
        <CardsWithSeeMore data={sportsData} />
      )}

      <div className="py-3 text-right pr-5">
        <Link to="/sports" className="mr-3">
          SEE MORE
          <FormatIndentIncreaseOutlined className="ml-1" />
        </Link>
      </div>
    </div>
  );
}

export default SportsSlider;
