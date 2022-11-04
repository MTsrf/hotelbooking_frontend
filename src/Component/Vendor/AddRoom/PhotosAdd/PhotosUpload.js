import { Box } from '@mui/system'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from './Styled';
import ImgPreview from './Preview/ImgPreview';
import dataURItoBlob from '../../../../helper/dataUritoBlob'
import { useSelector } from 'react-redux';
import axiosInstance from '../../../../helper/axiosInstance'
import { Alert, CircularProgress } from '@mui/material';
const PhotosUpload = ({ setVisible,setMessage }) => {
  const { temp } = useSelector((temp) => ({ ...temp }))
  const { vendor } = useSelector((vendor) => ({ ...vendor }))
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const onSubmit = async () => {
    try {
      if (images && images.length) {
        setLoading(true)
        const postImages = images.map((img) => {
          return dataURItoBlob(img);
        })
        const path = `hotelbooking/${vendor.name}/${temp.room_name}`
        let formData = new FormData()
        formData.append("path", path)
        formData.append("vendor",vendor.id)
        formData.append("room",temp._id)
        postImages.forEach((image) => {
          formData.append("file", image)
        })
        const { data:{message,success} } = await axiosInstance.post('/addPhotos', formData,
          {
            headers: {
              Authorization: `Bearer ${vendor.token}`,
              "content-type": "multipart/form-data",
            }
          }
        )
        if (success) {
          setError("")
          setMessage(message)
          setTimeout(()=>{
            setLoading(false)
            setVisible(false)
          },1000)
        }
        setMessage("")
      }
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
      setMessage("")
    }
  }

  return (
    <>
      <Box className='blur'>
        <Box className='postBox'>
          <Box className='box_header'>
            <Box className='small_circle'>
              <CloseIcon className='exit_icon' onClick={() => setVisible(false)} />
            </Box>
            {
              error ? <Alert severity='error'>{error}</Alert>: <span>Add Photos</span>
            }
          </Box>
          <Box className='box_picture'>
            <ImgPreview images={images} setImages={setImages} />
          </Box>
          
          <Button className='post_submit' onClick={() => { onSubmit() }} disabled={loading}>{loading? <CircularProgress sx={{color:"#fff"}}/>:"Post"}</Button>
          
          
        </Box>

      </Box>
    </>
  )
}

export default PhotosUpload
