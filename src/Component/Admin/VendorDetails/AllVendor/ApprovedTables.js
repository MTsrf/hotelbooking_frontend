import { Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import Empty from '../../../Empty'


const ApprovedTables = ({provider,handleBlocked,bmessage,handleUnblock}) => {
    return (
        <>
            {provider.length?<TableContainer component={Paper}>
                {
                    bmessage && <Alert severity='success'>{bmessage}</Alert>
                }
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                   
                    <TableHead className='tablehead'>

                        <TableRow>
                            <TableCell style={{ color: '#000' }}>ID</TableCell>
                            <TableCell style={{ color: '#000' }}>Name</TableCell>
                            <TableCell style={{ color: '#000' }}>Email Address</TableCell>
                            <TableCell style={{ color: '#000' }}>Phone Number</TableCell>
                            <TableCell style={{ color: '#000' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {provider?.map((data, index) => (

                            <TableRow >
                                <TableCell component="th" scope="row">
                                    {parseInt(index) + 1}
                                </TableCell>
                                <TableCell >{data.full_name}</TableCell>
                                <TableCell >{data.email}</TableCell>
                                <TableCell >{data.phone_number}</TableCell>
                                <TableCell >
                                    <Button
                                        variant="contained"
                                        className={data.isBlocked? 'unblocked_button':'blocked_button'}
                                        onClick={() => {
                                            data.isBlocked?handleUnblock(data):handleBlocked(data)
                                        }

                                        }
                                    >
                                        { 
                                        data.isBlocked ? 'UnBlocked':'Blocked'
                                        }
                                    </Button>


                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>:<Empty type="list"/>}
        </>
    )
}

export default ApprovedTables
