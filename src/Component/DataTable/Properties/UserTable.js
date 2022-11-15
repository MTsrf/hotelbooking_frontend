import { TableCell, TableRow } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const UserTable = ({ sendChange, item, index }) => {
    return (
        <>
            <TableRow key={index}>
                <TableCell align='center'>{index + 1}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.phone_number}</TableCell>
                <TableCell align="right" className="button">
                    <Box className='btn-row'>
                        <Box className='first' onClick={() => { sendChange(item._id, "deleted") }}>Deleted</Box>
                        {item.isVerified ? <Box className="second" onClick={() => { sendChange(item._id, "isVerified=false") }}>Blocked</Box> :
                            <Box className="second" onClick={() => { sendChange(item._id, "isVerified=true") }}>UnBlocked</Box>
                        }
                    </Box>
                </TableCell>
            </TableRow>
        </>
    )
}

export default UserTable
