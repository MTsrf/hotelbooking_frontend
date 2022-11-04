import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Alert, Box, Tab } from '@mui/material';
import React, { useState } from 'react'
import BasicInfos from './AllProperty/BasicInfos';
import Amenities from './Amenities';
import Locations from './Locations';
import './PropertAdd.scss'


const PropertyName = () => {
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    console.log(message);
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(value);
    return (
        <>
            <Box className='category_head'>
                {
                    message && <Alert severity='success'>{message}</Alert>
                }
                {
                    error && <Alert severity='error'>{error}</Alert>
                }
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab className='tab_property' label="Basic Info" value="1" />
                            <Tab className='tab_property' label="Location" value="2" />
                            {/* <Tab className='tab_property' label="Amenities" value="3" /> */}
                        </TabList>
                    </Box>
                    <TabPanel value="1"><BasicInfos setValue={setValue} setError={setError} setMessage={setMessage} /></TabPanel>
                    <TabPanel value="2"><Locations setValue={setValue} setError={setError} setMessage={setMessage} /></TabPanel>
                    {/* <TabPanel value="3"><Amenities /></TabPanel> */}

                </TabContext>
            </Box>
        </>
    )
}

export default PropertyName
