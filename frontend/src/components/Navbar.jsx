import React from 'react';

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
  SportsKabaddi as KabaddiIcon,
  SportsBaseball as BaseballIcon,
  SportsHockey as HockeyIcon,
  SportsRugby as RugbyIcon,
  SportsTennis as TennisIcon,
  SportsMartialArts as MartialArtsIcon,
} from '@mui/icons-material';
import { styled } from '@mui/system';

const CustomButton = styled(Button)({
  color: 'white',
  backgroundColor: '#09473F',
  variant: 'gradient',

  // '&:hover': {
  //   backgroundColor: 'green',
  // },
});
const navSportList = [
  {
    title: 'Cricket',
    description: 'The sound of leather on willow.',
    icon: CricketIcon,
    link: '/specific',
  },
  {
    title: 'Football',
    description: 'Get ready for some football action.',
    icon: SoccerIcon,
    link: '#',
  },
  {
    title: 'Basketball',
    description: 'Enjoy the game on the court.',
    icon: BasketballIcon,
    link: '#',
  },
  {
    title: 'Volleyball',
    description: 'Bump, set, spike!',
    icon: VolleyballIcon,
    link: '#',
  },
  {
    title: 'Pool',
    description: 'Dive in and make a splash.',
    icon: PoolIcon,
    link: '#',
  },
  {
    title: 'Kabaddi',
    description: 'Experience the thrill and strategy of Kabaddi.',
    icon: KabaddiIcon,
    link: '#',
  },
  {
    title: 'Baseball',
    description: 'Play ball! Baseball time.',
    icon: BaseballIcon,
    link: '#',
  },
  {
    title: 'Hockey',
    description: 'Fast-paced action on the ice.',
    icon: HockeyIcon,
    link: '#',
  },
  {
    title: 'Rugby',
    description: 'Hard-hitting rugby action.',
    icon: RugbyIcon,
    link: '#',
  },
  {
    title: 'Tennis',
    description: 'Grab your racket and hit the court.',
    icon: TennisIcon,
    link: '#',
  },
  {
    title: 'Martial Arts',
    description: 'Discipline and skill in martial arts.',
    icon: MartialArtsIcon,
    link: '#',
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navSportList.map(
    ({ icon, title, description, link }, key) => (
      <a href={link} key={key}>
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
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="/home"
        variant="small"
        color="blue-gray"
        className="font-semibold"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="/staffs"
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
        href="#"
        variant="small"
        color="blue-gray"
        className="font-semibold"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          Contact
        </ListItem>
      </Typography>
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-semibold"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          About Us
        </ListItem>
      </Typography>
    </List>
  );
}

function NavBar() {
  const [openNav, setOpenNav] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar className="sticky top-0 z-10 shadow-md border border-white/80 bg-opacity-80 max-w-full px-4 py-2 rounded-none backdrop-blur-2xl backdrop-saturate-200">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-customGreen text-xl"
        >
          {/* ℝ𝕦𝕙𝕦𝕟𝕒𝕊𝕡𝕠𝕣𝕥𝕤 */}
          𝕽𝖚𝖍𝖚𝖓𝖆𝕾𝖕𝖔𝖗𝖙𝖘
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          <Button
            onClick={() => (window.location.href = '/login')}
            variant="text"
            size="sm"
            color="blue-gray"
          >
            Log In
          </Button>

          {/* <Button
            onClick={() => (window.location.href = '/Signup')}
            variant="gradient"
            size="sm"
          >
            Sign Up
          </Button> */}
          <CustomButton
            onClick={() => (window.location.href = '/Signup')}
            size="sm"
          >
            Sign Up
          </CustomButton>
        </div>
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
      l
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          <Button
            onClick={() => (window.location.href = '/login')}
            variant="outlined"
            size="sm"
            color="blue-gray"
            fullWidth
          >
            Log In
          </Button>
          <CustomButton
            onClick={() => (window.location.href = '/Signup')}
            size="sm"
            fullWidth
          >
            Sign Up
          </CustomButton>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavBar;
