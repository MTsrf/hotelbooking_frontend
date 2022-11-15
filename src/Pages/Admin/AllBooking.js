import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Paper } from '@mui/material';
import TableModal from '../../Component/DataTable/TableModal';
import { CancelRow } from '../../Component/DataTable/Properties/DataSource';
import axiosInstance from '../../helper/axiosInstance';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

const AllBooking = () => {
    const admin = useSelector(state => state.admin)
    const [value, setValue] = useState('1');
    const [booked, setBooked] = useState([]);
    const [cancel, setCancel] = useState([])
    const [completed, setCompleted] = useState([])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const title = "All Upcoming Booking List"
    const title2 = "All Cancel List"
    const title3 = "All Completed List"
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosInstance.get("/bookingList",
                    {
                        headers: {
                            Authorization: `Bearer ${admin.token}`,
                            "content-type": "multipart/form-data"
                        }
                    })
                const bookedData = data?.filter((item) => {
                    return item.isBooked === true
                })
                setBooked(bookedData)
                const cancelData = data?.filter((item) => {
                    return item.cancel === true
                })
                setCancel(cancelData)
                const completedData = data?.filter((item) => {
                    return item.completed === true
                })
                setCompleted(completedData)
            } catch (error) {

            }
        }
        fetchData()
    }, [])

    return (
        <>
            <Paper className='all-booking'>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Upcoming Booking" value="1" sx={{ fontWeight: 'bold', fontSize: '18px' }} />
                            <Tab label="Cancel Booking" value="2" sx={{ fontWeight: 'bold', fontSize: '18px' }} />
                            <Tab label="Completed" value="3" sx={{ fontWeight: 'bold', fontSize: '18px' }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <TableModal
                            columns={CancelRow}
                            data={booked}
                            table="booking"
                            btnoff={true}
                            heading={title}
                        />
                    </TabPanel>
                    <TabPanel value="2">
                        <TableModal
                            columns={CancelRow}
                            data={cancel}
                            table="booking"
                            heading={title2}
                        />
                    </TabPanel>
                    <TabPanel value="3">
                        <TableModal
                            columns={CancelRow}
                            data={completed}
                            table="booking"
                            heading={title3}
                        />
                    </TabPanel>
                </TabContext>
            </Paper>
        </>
    )
}

export default AllBooking
