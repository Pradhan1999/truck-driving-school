import { Grid, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { CircleWithCheck } from 'assets/svg/circle';
import MainCard from 'components/MainCard';
import Page from 'components/ui/PageLayout';
import React, { useState } from 'react';
import ManageStaff from './manageStaff';
import { Outlet, useLocation, useNavigate } from 'react-router';

function getPathIndex(pathname: string) {
  let selectedTab = 0;
  switch (pathname) {
    case '/profile/changePassword':
      selectedTab = 1;
      break;

    case '/profile/schoolCommission':
      selectedTab = 2;
      break;

    case '/profile/roleManager':
      selectedTab = 5;
      break;
    case '/profile/manageStaff':
      selectedTab = 3;
      break;

    case '/profile/notification':
      selectedTab = 4;
      break;
    case '':
    default:
      selectedTab = 0;
  }
  return selectedTab;
}
const Profile = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedIndex, setSelectedIndex] = useState<any>(getPathIndex(pathname));

  const handleListItemClick = (index: number, route: string) => {
    setSelectedIndex(index);
    navigate(route);
  };

  return (
    <Page title="My Profile">
      <Grid container xs={12} spacing={4}>
        <Grid item xs={3}>
          <MainCard>
            <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 10, color: 'secondary.main' } }}>
              {[
                { value: 'Profile Information', route: '/profile/detail' },
                { value: 'Change Password', route: '/profile/changePassword' },
                { value: 'School Commissions', route: '/profile/schoolCommission' },
                { value: 'Manage Staff', route: '/profile/manageStaff' },
                { value: 'Notification Settings', route: '/profile/notification' },
                { value: 'Roles and Permissions', route: '/profile/roleManager' }
              ].map((text, index) => (
                <ListItemButton key={index} selected={selectedIndex === index} onClick={() => handleListItemClick(index, text?.route)}>
                  <ListItemIcon sx={{ margin: 1 }}>
                    <CircleWithCheck color={selectedIndex === index ? '#2A50ED' : 'gray'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontSize: '15px' }}>
                        {text?.value}
                      </Typography>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </MainCard>
        </Grid>
        <Grid item xs={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Profile;
