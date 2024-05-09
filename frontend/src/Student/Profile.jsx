import React, { useState } from 'react';
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  PowerIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

// profile menu component
const profileMenuItems = [
  {
    label: 'My Profile',
    icon: UserCircleIcon,
    path: '/my-profile',
  },
  {
    label: 'Enrolled Sports',
    icon: InboxArrowDownIcon,
    path: '/edit-profile',
  },
  {
    label: 'Email',
    icon: EnvelopeIcon,
    path: '/email',
  },
  {
    label: 'Logout',
    icon: PowerIcon,
    isLogout: true,
  },
];

function Profile({ logout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const role = location.state?.role || '';

  const closeMenu = () => setIsMenuOpen(false);

  const handleMenuItemClick = (menuItem) => {
    if (menuItem.isLogout) {
      logout();
    } else {
      navigate(menuItem.path, { state: { role } });
    }
    closeMenu();
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path, isLogout }) => {
          return (
            <MenuItem
              key={label}
              onClick={() => handleMenuItemClick({ path, isLogout })}
              className="flex items-center gap-2 rounded focus:bg-gray-200 active:bg-gray-500"
            >
              {React.createElement(icon, {
                className: 'h-4 w-4',
                strokeWidth: 2,
              })}
              <Typography as="span" variant="small" className="font-semibold ">
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default Profile;
