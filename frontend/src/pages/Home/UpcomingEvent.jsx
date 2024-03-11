import { Typography } from '@material-tailwind/react';
import React from 'react';
import CardsWithSeeMore from '../../components/CardsWithSeeMore';
import { Link } from 'react-router-dom';
import { FormatIndentIncreaseOutlined } from '@mui/icons-material';
import { sportsData } from '../../data';

function UpcomingEvent() {
  const { sports } = sportsData;
  return (
    <div className="bg-customGreen mt-5 text-white">
      <Typography className="mx-3 pt-2">UPCOMING EVENTS</Typography>
      <CardsWithSeeMore data={sports} />
      <div className="py-3 text-right pr-5">
        <Link className="mr-3">
          SEE MORE
          <FormatIndentIncreaseOutlined className="ml-1" />
        </Link>
      </div>
    </div>
  );
}

export default UpcomingEvent;
