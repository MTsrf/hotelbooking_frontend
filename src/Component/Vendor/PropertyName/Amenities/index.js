import React from 'react'
import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import TableAmenities from './TableAmenities'
import './Amenties.scss'
import BasicFacilies from './Facilities/BasicFacilies'
import GeneralService from './Facilities/GeneralService'
import Foods from './Facilities/Foods'
import Health from './Facilities/Health'


const Amenities = () => {
    return (
        <React.Fragment>
            <Paper className='amenties_main'>
                <Box>
                    <Typography variant='h6' className='amenties_head'>
                        Add Amenities
                    </Typography>
                </Box>
                <Box className='ameniteies_features'>
                    <Paper elevation='3' className='paper'>
                        <Box className='heading'>
                            <Typography>Basic Facilities</Typography>
                        </Box>
                        <Box className='input_field'>
                            <BasicFacilies/>
                        </Box>
                    </Paper>
                    <Paper elevation='3' className='paper'>
                        <Box className='heading'>
                            <Typography>General Service</Typography>
                        </Box>
                        <Box className='input_field'>
                            <GeneralService/>
                        </Box>

                    </Paper>
                    <Paper elevation='3' className='paper'>
                        <Box className='heading'>
                            <Typography>Food and Drinks</Typography>
                        </Box>
                        <Box className='input_field'>
                            <Foods/>
                        </Box>
                    </Paper>
                    <Paper elevation='3' className='paper'>
                        <Box className='heading'>
                            <Typography>Health and beauty</Typography>
                        </Box>
                        <Box className='input_field'>
                            <Health/>
                        </Box>
                    </Paper>
                </Box>
            </Paper>
        </React.Fragment>
    )
}

export default Amenities
