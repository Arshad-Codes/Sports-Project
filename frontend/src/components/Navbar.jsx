import React, { useState } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  SportsCricket as CricketIcon,
  SportsSoccer as SoccerIcon,
  SportsBasketball as BasketballIcon,
  SportsVolleyball as VolleyballIcon,
  Pool as PoolIcon,
  SportsBaseball as BaseballIcon,
  SportsHockey as HockeyIcon,
  SportsTennis as TennisIcon,
} from '@mui/icons-material';
import { styled } from '@mui/system';
import LoginPopup from '../pages/Home/LoginPopup';
import { useNavigate } from 'react-router-dom';
import Profile from '../Student/Profile';

const CustomButton = styled(Button)({
  color: 'white',
  backgroundColor: '#09473F',
  variant: 'gradient',
});
const navSportList = [
  {
    title: 'Cricket',
    slag: 'Cricket',
    description: 'The sound of leather on willow.',
    icon: CricketIcon,
  },
  {
    title: 'Football',
    slag: 'Football',
    description: 'Get ready for some football action.',
    icon: SoccerIcon,
  },
  {
    title: 'Basketball',
    slag: 'Basketball',
    description: 'Enjoy the game on the court.',
    icon: BasketballIcon,
  },
  {
    title: 'Swimming',
    slag: 'Swimming',
    description: 'Dive in and make a splash.',
    icon: PoolIcon,
  },
  {
    title: 'Volleyball',
    slag: 'Volleyball',
    description: 'Bump, set, spike!',
    icon: VolleyballIcon,
  },
  {
    title: 'Baseball',
    slag: 'Baseball',
    description: 'Play ball! Baseball time.',
    icon: BaseballIcon,
  },
  {
    title: 'Hockey',
    slag: 'Hockey',
    description: 'Fast-paced action on the ice.',
    icon: HockeyIcon,
  },
  {
    title: 'Tennis',
    slag: 'Tennis',
    description: 'Grab your racket and hit the court.',
    icon: TennisIcon,
  },

  {
    title: 'See More',
    slag: '',
    description: '',
    icon: Bars3Icon,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderItems = navSportList.map(
    ({ icon, title, description, slag }, key) => (
      <a href={`/sports/${slag}`} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {' '}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: 'h-6 w-6 text-gray-900',
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-semibold ">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-semiboldm text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Sports
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  const navigate = useNavigate();
  const handleClick = (name) => {
    if (name === 'staffs') {
      navigate('/staffs');
    } else if (name === 'achievement') {
      navigate('/achievement');
    } else if (name === 'live') {
      navigate('/liveMain');
    }
  };
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="/"
        variant="small"
        color="blue-gray"
        className="font-semibold"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        onClick={() => handleClick('staffs')}
        variant="small"
        color="blue-gray"
        className="font-semibold"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Staffs
        </ListItem>
      </Typography>
      <Typography
        as="a"
        onClick={() => handleClick('achievement')}
        variant="small"
        color="blue-gray"
        className="font-semibold"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Achievements
        </ListItem>
      </Typography>
      <Typography
        as="a"
        onClick={() => handleClick('live')}
        variant="small"
        color="blue-gray"
        className="font-semibold"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">Live</ListItem>
      </Typography>
    </List>
  );
}

function NavBar() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const role = currentUser?.role || '';
  const navigate = useNavigate();
  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const openLoginPopup = () => {
    setIsLoginPopupOpen(true);
  };

  const closeLoginPopup = () => {
    setIsLoginPopupOpen(false);
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    //localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <Navbar className="sticky top-0 z-50 shadow-md border border-white/80 bg-opacity-80 max-w-full px-4 py-2 rounded-none backdrop-blur-2xl backdrop-saturate-200">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-blue-900 text-xl"
        >
          {/* ℝ𝕦𝕙𝕦𝕟𝕒𝕊𝕡𝕠𝕣𝕥𝕤 */}
          𝕽𝖚𝖍𝖚𝖓𝖆𝕾𝖕𝖔𝖗𝖙𝖘
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        {role?.toLowerCase() === 'student' && (
          <div className="lg:flex">
            <Profile logout={handleLogout} />
          </div>
        )}
        {role?.toLowerCase() !== 'student' && (
          <div className="hidden lg:flex">
            <Button
              onClick={openLoginPopup}
              variant="text"
              size="sm"
              color="blue-gray"
            >
              Log In
            </Button>
            {isLoginPopupOpen && <LoginPopup onClose={closeLoginPopup} />}

            <CustomButton onClick={() => handleSignupClick()} size="sm">
              Sign Up
            </CustomButton>
          </div>
        )}
        <div className="flex gap-2 lg:hidden">
          {/* <div>
            <Profile logout={handleLogout} />
          </div> */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <NavList />

        {role?.toLowerCase() !== 'student' ? (
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <Button
              onClick={openLoginPopup}
              variant="outlined"
              size="sm"
              color="blue-gray"
              fullWidth
            >
              Log In
            </Button>
            {isLoginPopupOpen && <LoginPopup onClose={closeLoginPopup} />}
            <CustomButton
              onClick={() => handleSignupClick()}
              size="sm"
              fullWidth
            >
              Sign Up
            </CustomButton>
          </div>
        ) : null}
      </Collapse>
    </Navbar>
  );
}

export default NavBar;
