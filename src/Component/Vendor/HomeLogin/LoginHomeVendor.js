import React, { useState } from 'react'
import { Box, Card, Container, Grid, Typography } from '@mui/material'
import './HomeLogin.css'
import LoginFormVendor from './LoginFormVendor'
import SignupFormVendor from './SignupFormVendor'





const LoginHomeVendor = () => {
  const [visible,setVisible] = useState(false)

  const handleVisibleOpen =()=>{
    setVisible(true)
  }
  const handleVisibleClose =()=>{
    setVisible(false)
  }

  return (
    <React.Fragment>
      <Box className='vendor_home'>
        <Container maxWidth="xl">
          <Grid
            container="xl"
            spacing={1}
            align="center"
            justify="center"
            justifyContent="space-evenly"
            direction="row"
            className='grid_vendor_home'
          >
            <Grid item xs={6} className="grid_vendor_content">
              <Typography component="h1" variant='h5'>List your home to start earning</Typography>
              <Typography>Whether you’re new to listing or already have your property online, you’re in the right place. Booking.com has over 20 years of expertise in the business as well as a global team that’s serious about getting you bookings.</Typography>
             
            </Grid>
            <Grid item>
              <Card style={{backgroundColor: "#e8eaf6"}} className="card_vendor_login" >
                {
                  !visible?<LoginFormVendor handleVisibleOpen={handleVisibleOpen}/>:<SignupFormVendor handleVisibleClose={handleVisibleClose} setVisible={setVisible}/>
                }
              </Card>
            </Grid>
          </Grid>
         
        </Container>
      </Box>
    </React.Fragment>
  )
}

export default LoginHomeVendor
