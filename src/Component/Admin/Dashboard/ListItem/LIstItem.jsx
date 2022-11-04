import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Link} from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import React from 'react';
import './ListItem.css'
export const mainListItems = (
  <React.Fragment>
     <ListItemButton >
      <ListItemIcon>
      <DashboardIcon style={{color:'#0076d7'}}/>
      </ListItemIcon>
      <Link className='decoration-changes' to={'/admin/dashboard'}>
      <ListItemText primary="Dashboard" active/>
      </Link>
    </ListItemButton>
    <ListItemButton >
      <ListItemIcon>
      <CategoryIcon style={{color:'#0076d7'}}/>
      </ListItemIcon>
      <Link className='decoration-changes' to={'/admin/dashboard/category'}>
      <ListItemText primary="Category" active/>
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <PeopleIcon style={{color:'#0076d7'}}/>
      </ListItemIcon>
      <Link className='decoration-changes' to={'/admin/dashboard/provider'}>
      <ListItemText primary="Providers" />
      </Link>
      
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <DashboardIcon style={{color:'#0076d7'}}/>
      </ListItemIcon>
      <Link className='decoration-changes' to={'/home/slot'}>
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

