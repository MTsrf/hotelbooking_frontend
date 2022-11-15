import { Box, Button, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from 'react'
import './DataModel.scss'
import Empty from '../Empty';
import AlertDialog from '../AlertDailog';
import SearchBar from '../Search';
import BookingTable from './Properties/BookingTable';
import UserTable from './Properties/UserTable';
import HotelTables from './Properties/HotelTables';

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});
const TableModal = (
    { columns,
        data,
        table,
        heading,
        button,
        btnoff,
        onUpdate,
        setOpen,
        open,
        setPage
    }) => {
    const classes = useStyles();
    const [list, setList] = useState()
    const [searched, setSearched] = useState("");
    const [message, setMessage] = useState("")
    const [store, setStore] = useState()
    const [icon, setIcon] = useState(false)

    useEffect(() => {
        setList(data)
    }, [data])
    const count = list?.length ? true : false;
    const sendChange = (id, type) => {
        openAlert(type)
        setStore({ id: id, type: type })
    }
    console.log("open", open);
    const openAlert = (type) => {
        if (type == "cancel") {
            setMessage("Are you Cancel this Order")
            setOpen(!open)
        } else if (type == "yes") {
            onUpdate(store)
        } else if (type == "completed") {
            setMessage("Completed this booking")
            setOpen(!open)
            setIcon(true)
        } else if (type == "deleted") {
            setMessage("Are you Deleted this user")
            setOpen(!open)
        } else if (type == "isVerified=false") {
            setMessage("Are you Block this user")
            setOpen(!open)
        } else if (type == "isVerified=true") {
            setMessage("Are you UnBlock this user")
            setOpen(!open)
        } else if (type == "isBlocked=false") {
            setMessage("Are you UnBlocked this User")
            setOpen(!open)
        } else if (type == "isBlocked=true") {
            setMessage("Are you Blocked this User")
            setOpen(!open)
        }
    }

    const handleChangePage = (event, newPage) => {
        console.log("Hai", newPage);
        setPage(newPage - 1);
    };
    console.log("hotel", list);
    console.log(table);
    return (
        <>
            <Box className='DataModel'>
                <Paper>
                    <Box className='heading-section'>
                        <Box>
                            <Typography sx={{ fontWeight: 'bold', fontSize: "20px" }}>{heading}</Typography>
                        </Box>
                        {button && <Box>
                            <Button variant="contained">Add New</Button>
                        </Box>}
                    </Box>
                    <Box className='search'>
                        <SearchBar
                            searched={searched}
                            data={data}
                            setList={setList}
                            setSearched={setSearched}
                            table={table}
                        />
                    </Box>
                    {count ? <TableContainer className='table'>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {
                                        columns?.map((item, index) => (
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '15px' }} align="center" key={index}>{item}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {table == "booking" &&

                                    list?.map((item, index) => (
                                        <BookingTable
                                            item={item}
                                            index={index}
                                            sendChange={sendChange}
                                            btnoff={btnoff}
                                        />
                                    ))



                                }
                                {
                                    table === "user" &&
                                    list?.map((item, index) => (
                                        <UserTable
                                            item={item}
                                            index={index}
                                            sendChange={sendChange}
                                        />
                                    ))
                                }
                                {
                                    table === "hotel" &&
                                    list?.map((item, index) => (
                                        <HotelTables
                                            item={item}
                                            index={index}
                                            sendChange={sendChange}
                                        />
                                    ))
                                }


                            </TableBody>
                        </Table>
                    </TableContainer> : <Empty type="list" />}
                    <Box className='page-Box'>
                        <Pagination
                            className='pagination'
                            count={3}
                            onChange={handleChangePage}
                        />
                    </Box>

                </Paper>
            </Box>
            {
                open && <AlertDialog
                    message={message}
                    noClick={setOpen}
                    yesClick={openAlert}
                    icon={icon}
                />
            }

        </>
    )
}

export default TableModal
