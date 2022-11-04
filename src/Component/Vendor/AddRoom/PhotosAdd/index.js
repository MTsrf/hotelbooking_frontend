import { Alert, Box, Button, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import ImageUpload from './image'
import './ImagesUpload.scss'
import PhotosUpload from './PhotosUpload'
const PhotosAdd = () => {
  const [visible, setVisible] = useState(false)
  const [ message,setMessage] = useState("")
  return (
    <React.Fragment>
      {
        visible && <PhotosUpload setVisible={setVisible} setMessage={setMessage}/>
      }
        {
          message && <Alert severity='success'>{message}</Alert>
        }

      
      <Paper className='photo_main'>
        <Box className='photo_heading'>
          <Typography className='text' variant='h7'>Add your Photos</Typography>
          <Button onClick={()=>{setVisible(true)}}>upload Image</Button>
        </Box>
        <Box>
        </Box>
      </Paper>

    </React.Fragment>
  )
}

export default PhotosAdd
