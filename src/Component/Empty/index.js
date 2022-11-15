import { Box, Typography } from '@mui/material'
import React from 'react'
import png from '../../assets/undraw_no_data_re_kwbl.svg';
import './Empty.scss'

const Empty = ({value,type}) => {
    return (
        <>
            <Box className='empty-main'>
                <Box>
                    <img src={png} alt="empty-bucket" className='bucket' />
                </Box>
               { type !== "list" && <Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '25px' }}>
                        {` Looks empty, you've no ${value.toLowerCase()} bookings.`}
                    </Typography>
                    <Typography>{`Looks like You don’t have any ${value.toLowerCase()} trips.`}</Typography>
                </Box>  }
                {
                    type == "list" && <Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '25px' }}>
                    Looks empty, you've no data
                    </Typography>
                </Box>
                }
            </Box>
        </>
    )
}

export default Empty
