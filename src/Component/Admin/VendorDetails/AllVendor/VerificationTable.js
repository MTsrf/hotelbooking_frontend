import { Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import Empty from '../../../Empty'
const VerificationTable = ({ verified, handleApprove, message }) => {
    return (
        <React.Fragment>
            {verified.length ? <TableContainer component={Paper}>
                {
                    message && <Alert severity='success'>{message}</Alert>
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

                        {verified?.map((data, index) => (

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
                                        color="primary"
                                        onClick={() => {
                                            handleApprove(data)
                                        }

                                        }
                                    >
                                        Approve
                                    </Button>


                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>:<Empty type="list"/>}
        </React.Fragment>
    )
}

export default VerificationTable
