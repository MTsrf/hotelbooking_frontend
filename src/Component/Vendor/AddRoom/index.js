import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Alert, Box, Tab } from '@mui/material'
import React, { useState } from 'react'
import RoomDetails from './RoomDetails'
import PhotosAdd from './PhotosAdd'
const AddRoom = () => {
    const [ error,setError ] = useState("")
    const [ message,setMessage ] = useState("")
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log("ivsidojlsk");
    console.log(message);
    return (
        <>
            <Box className='category_head'>
                {
                    error && <Alert severity='error'>{error}</Alert>
                }
                {
                    message && <Alert severity='success'>{message}</Alert>
                }
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab className='tab_property' label="Add Room" value="1" />
                            <Tab className='tab_property' label="Add Photos" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><RoomDetails setValue={setValue} setError={setError} setMessage={setMessage} /></TabPanel>
                    <TabPanel value="2"><PhotosAdd setValue={setValue} setError={setError} setMessage={setMessage} /></TabPanel>
                </TabContext>
            </Box>
        </>
    )
}

export default AddRoom
