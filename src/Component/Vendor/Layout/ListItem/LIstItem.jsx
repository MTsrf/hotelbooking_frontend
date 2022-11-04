import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Link} from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import AssignmentIcon from '@mui/icons-material/Assignment';
import React from 'react';
import './ListItem.css'
export const mainListItems = (
  <React.Fragment>
     <ListItemButton >
      <ListItemIcon>
      <DashboardIcon style={{color:'#0076d7'}}/>
      </ListItemIcon>
      <Link className='decoration-changes' to={'/vendor/home'}>
      <ListItemText primary="Dashboard" active/>
      </Link>
    </ListItemButton>
    <ListItemButton >
      <ListItemIcon>
      <HolidayVillageIcon style={{color:'#0076d7'}}/>
      </ListItemIcon>
      <Link className='decoration-changes' to={'/vendor/home/property'}>
      <ListItemText primary="Add Property" active/>
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <AssignmentIcon style={{color:'#0076d7'}}/>
      </ListItemIcon>
      <Link className='decoration-changes' to={'/vendor/home/room'}>
      <ListItemText primary="Add Room" />
      </Link>
      
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <DashboardIcon style={{color:'#0076d7'}}/>
      </ListItemIcon>
      <Link className='decoration-changes' to={'/vendor/home/hotel'}>
      <ListItemText primary="Booking Slots" />
      </Link>
    </ListItemButton>
   
    {/* <ListItemButton>
      <ListItemIcon>
        <LayersIcon style={{color:'#fff'}}/>
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton> */}
  </React.Fragment>
);

