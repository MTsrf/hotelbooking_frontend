import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectCategory = ({ categorydata,handleBasicChange,catSubmit,ErrorMessage,errorcat }) => {
  return (
    <Fragment>
        <FormControl sx={{ m: 1, width: 500 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select Category</InputLabel>
        <Select
          onChange={handleBasicChange}
          name='categories'
          input={<OutlinedInput label="Select Category" />}
          MenuProps={MenuProps}
          type='text'
        >
          {categorydata.map((item,index) => (
            <MenuItem key={index} value={item._id} onClick={()=>catSubmit(item.description)}>{item.category}</MenuItem>
          ))}
        </Select>
        {
          errorcat && <Typography>Select your category</Typography>
        }
      </FormControl>
    </Fragment>
  )
}

export default SelectCategory
