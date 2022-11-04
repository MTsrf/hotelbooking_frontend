import { Box,Tab } from '@mui/material'
import React from 'react'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './Category.scss'
import AllCategory from './AllCategory';

const Category = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>

            <Box className='category_head'>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Category" value="1" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><AllCategory/></TabPanel>
                </TabContext>
            </Box>


        </React.Fragment>
    )
}

export default Category
