import { Box, TableCell, TableRow } from '@mui/material'
import moment from 'moment'
import React from 'react'

const BookingTable = ({ item, index, sendChange, btnoff }) => {
    return (
        <>
            <TableRow key={index}>
                <TableCell align='center'>{index + 1}</TableCell>
                <TableCell align="center"><img width="100px" src={item.room.images[0][0].url} alt="prd-img" /></TableCell>
                <TableCell align="center">{item.property.property_name}</TableCell>
                <TableCell align="center">{item.room.room_name}</TableCell>
                <TableCell align="center">{item.roomNumber}</TableCell>
                <TableCell align="center">{item.GuestName}</TableCell>
                <TableCell align="center">{moment(item.Date.startDate).format("L")}</TableCell>
                <TableCell align="center">{moment(item.Date.endDate).format("L")}</TableCell>
                {item.isBooked && <TableCell align="center" sx={{ fontWeight: 'bold', color: '#00a152' }}>Booked</TableCell>}
                {item.cancel && <TableCell align='center' sx={{ fontWeight: 'bold', color: 'red' }}> Cancelled</TableCell>}
                {item.completed && <TableCell align='center' sx={{ fontWeight: 'bold', color: '#00e676' }}>Completed</TableCell>}
                {item.isBooked && <TableCell align="center" className="button">
                    {!btnoff && <Box className='btn-row'>
                        <Box className='first' onClick={() => { sendChange(item._id, "cancel") }}>Cancel</Box>
                        <Box className="second" onClick={() => { sendChange(item._id, "completed") }}>Completed</Box>
                    </Box>}
                </TableCell>}
            </TableRow>
        </>
    )
}

export default BookingTable