import { Box, Typography } from '@mui/material'
import React from 'react'
import './Notifications.scss'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';

const Notifications = ({onLogout}) => {
   const navigate = useNavigate()
    return (
        <Box className='blurBox'>
            <Box className='notificationsBox'>
                <Box className='arrow'></Box>
                <Box className='secondBox'>
                    <Box className='profile'>
                        <Person2OutlinedIcon  className='icon'/>
                        <Box onClick={()=>{navigate('/profile')}}>
                            <Typography className='text'>My Profile</Typography>
                            <Typography className='text1'>Manage your profile,Booking list,login details and password</Typography>
                        </Box>
                    </Box>
                    <Box className='trip'>
                        <CardTravelOutlinedIcon className='icon'/>
                        <Box>
                            <Typography className='text'>My Booking</Typography>
                            <Typography className='text1'>See booking details,Cancel Booking,ModifyBooking,Confirm Booking</Typography>
                        </Box>
                    </Box>
                    <Box className='logout' onClick={()=>onLogout()}>
                        <LogoutOutlinedIcon className='icon'/>
                        <Box>
                            <Typography className='text'>Logout</Typography>
                            <Typography className='text1'>Please Exit the Profile, Secure Profile and logout the account</Typography>
                        </Box>
                    </Box>
                    
                </Box>
            </Box>

        </Box>
    )
}

export default Notifications
