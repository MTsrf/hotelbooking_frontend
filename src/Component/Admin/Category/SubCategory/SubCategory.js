import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { Fragment } from 'react'

const SubCategory = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Fragment>
            <Box>
                <Box>
                    <Typography>
                        Sub Category
                    </Typography>
                </Box>
                <Box className='tab_one'>
                    <Box>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                            className='input_category'
                            size='small'
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Box>
                    <Box>
                        <TextField size='small' className='input_category' variant='outlined'/>
                    </Box>
                    <Box>
                        <Button variant='contained'>Save</Button>
                    </Box>
                </Box>
                
            </Box>

        </Fragment>
    )
}

export default SubCategory
