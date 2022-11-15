import {  Box, Button, Typography } from '@mui/material'
import React from 'react'
import './AlertDailog.scss'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const AlertDailog = ({ icon, message , noClick, yesClick }) => {

  return (
    <>
      <Box className='blur'>
        <Box className='alertBox'>
          <Box className='containerAlert'>
            {
              icon ? <CheckCircleOutlineIcon sx={{color:'#00a152',fontSize:'60px !important'}}/> : <ErrorOutlineIcon sx={{color:'#f44336',fontSize:'60px !important'}}/>
            }
            <Typography sx={{fontSize:'20px',fontWeight:"bold"}}>{message}</Typography>
          </Box>
          <Box className='buttonAlert'>
            <Button variant='outlined' onClick={()=>{noClick(false)}}>No</Button>
            <Button variant='outlined' onClick={()=>{yesClick("yes")}}>Yes</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AlertDailog
