import { Checkbox } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
import React from "react";
import './FilterPanel.scss'

const Filter = ()=>{
    return(
    <>
    <Box className='filterPanel'>
        <Box className="istitle">
            <Typography>Category</Typography>
        </Box>
        <Box className="categoryItems">
            <Checkbox/>
        </Box>
    </Box>
    </>
    )
}

export default Filter