import { TableCell, TableRow } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const HotelTables = ({ index, item, sendChange }) => {
    return (
        <>
            <TableRow key={index}>
                <TableCell align='center'>{index + 1}</TableCell>
                <TableCell align="center">
                    <img width="100px" src={item.images[0][0].url} alt="hotel-img" />
                </TableCell>
                <TableCell align="center">{item.property.property_name}</TableCell>
                <TableCell align="center">{item.property.phone_number}</TableCell>
                <TableCell align="center">{item.property.city}</TableCell>
                <TableCell align="center">{item.vendor.full_name}</TableCell>
                <TableCell align="center">{item.roomNumbers}</TableCell>
                <TableCell align="right" className="button">
                    <Box className='btn-row'>
                        {item.isBlocked ? <Box className="second" onClick={() => { sendChange(item._id, "isBlocked=false") }}>UnBlock</Box> :
                            <Box className='first' onClick={() => { sendChange(item._id, "isBlocked=true") }}>Block</Box>
                        }
                    </Box>
                </TableCell>
            </TableRow>
        </>
    )
}

export default HotelTables
