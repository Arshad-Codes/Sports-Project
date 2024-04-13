import { Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import CardsWithSeeMore from '../../components/CardsWithSeeMore';
import { Link } from 'react-router-dom';
import { FormatIndentIncreaseOutlined } from '@mui/icons-material';
import axios from 'axios';

function SportsSlider() {
  const [sportsData, setSportsData] = useState([]);
  useEffect(() => {
    async function fetchSports() {
      try {
        const response = await axios.get(
          'http://localhost:8800/api/sport/getSports'
        );
        setSportsData(response.data);
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    }
    fetchSports();
  }, []);
  return (
    <div className="bg-customGreen mt-5 text-white">
      <Typography className="mx-3 pt-2">SPORTS</Typography>
      <CardsWithSeeMore data={sportsData} />
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
