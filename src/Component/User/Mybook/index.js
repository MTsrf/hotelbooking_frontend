import React, { useEffect, useState } from 'react';
import { Box, Grid, Tab, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import NoLuggageOutlinedIcon from '@mui/icons-material/NoLuggageOutlined';
import BeenhereOutlinedIcon from '@mui/icons-material/BeenhereOutlined';
import './Mybook.scss'
import Upcoming from './Upcoming';
import axiosInstance from '../../../helper/axiosInstance';
import { useSelector } from 'react-redux';
import Empty from '../../Empty';

const MyBook = () => {
    const [value, setValue] = useState("Upcoming");
    const handleChange = (event, newValue) => {
        setValue(newValue);

    };
    console.log(`bookinglist${value}`);
    const user = useSelector(state => state.user)
    const [upcoming, setUpcoming] = useState([])
    const [cancelled, setCancelled] = useState([])
    const [completed, setCompleted] = useState([])
    const [update,setUpdate] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { success, completed } } = await axiosInstance.get("/finishedbooking",
                    {
                        headers: {
                            Authorization: `Bearer ${user?.authData?.token}`,
                            "content-type": "multipart/form-data",
                        }
                    }
                )
                const upcom = completed?.filter((item) => {
                    return item.isBooked === true;
                })
                setUpcoming(upcom)
                const cancel = completed?.filter((item) => {
                    return item.cancel === true;
                })
                setCancelled(cancel)
                const complete = completed?.filter((item) => {
                    return item.completed === true;
                })
                setCompleted(complete)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchData()

    }, [update])
    const onCancel =async(id) =>{
        console.log(id);
        const {data:{success}} = await axiosInstance.patch('/cancelBooking',{id},{
            headers:{
                Authorization: `Bearer ${user?.authData?.token}`,
                "content-type": "multipart/form-data",
            }
        })
        setUpdate(prev => !prev)
    }
    return (
        <>
            <Box className='bookingList-main'>
                <Box className={`styleContainer${value}`} />
                <Box className='containerBox'>
                    <Typography className='text'>{value}</Typography>
                </Box>
                <Box className='containerBox'>
                    <Box className="bookinglist">
                        <Grid item sm={12} xs={12}>
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value}>
                                    <Box sx={{ borderColor: 'divider' }}>
                                        <TabList onChange={handleChange} >
                                            <Tab icon={<LuggageOutlinedIcon />} iconPosition="start" label="UPCOMING" value="Upcoming" />
                                            <Tab icon={<NoLuggageOutlinedIcon />} iconPosition="start" label="CANCELLED" value="Cancelled" />
                                            <Tab icon={<BeenhereOutlinedIcon />} iconPosition="start" label="COMPLETED" value="Completed" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="Upcoming">
                                        {
                                            upcoming.length ? <Upcoming upcoming={upcoming} onCancel={onCancel} value={value}/> : <Empty value={value}/>
                                        }
                                    </TabPanel>
                                    <TabPanel value="Cancelled">
                                        {
                                            cancelled.length ? <Upcoming cancelled={cancelled} value={value}/> : <Empty value={value} />
                                        }
                                    </TabPanel>
                                    <TabPanel value="Completed">
                                        {
                                            completed.length ? <Upcoming completed={completed} value={value}/> : <Empty value={value} />
                                        }
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MyBook