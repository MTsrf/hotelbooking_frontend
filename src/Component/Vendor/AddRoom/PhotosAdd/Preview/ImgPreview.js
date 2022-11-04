import { div } from '@mui/material'
import React, { useRef } from 'react'
import { Btn, Input } from '../Styled'
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EditIcon from '@mui/icons-material/Edit';
import './preview.css'

const ImgPreview = ({ images, setImages }) => {
    const imageInuptRef = useRef(null)
    const handleImages = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((img) => {
            const reader = new FileReader();
            reader.readAsDataURL(img)
            reader.onload = (readerEvent) => {
                setImages((images) => [...images, readerEvent.target.result]);
            }
        });
    }
    return (
        <div className='overflow_a scrollbar'>
            <div className='add_pics_wrap'>
                <Input
                    type='file'
                    multiple
                    hidden
                    ref={imageInuptRef}
                    onChange={handleImages}
                />
                {
                    images && images.length ? (
                        <div className='add_pics_inside1 p0'>
                            <div className='preview_pics_inside1'>
                                <div className='preview_actions'>
                                    <Btn onClick={()=>{setImages([])}}>
                                        <EditIcon className='edit_icon' />
                                        Edit
                                    </Btn>
                                    <Btn onClick={()=>{setImages([])}}>
                                        <AddPhotoAlternateIcon />
                                        Add Photos
                                    </Btn>
                                </div>
                                <div className='small_white_circle'>
                                    <CloseIcon  onClick={()=>{setImages([])}}/>
                                </div>
                                <div className={
                                    images.length === 1
                                    ? "preview1"
                                    : images.length === 2
                                    ? "preview2"
                                    : images.length === 3
                                    ? "preview3"
                                    : images.length === 4
                                    ? "preview4 "
                                    : images.length === 5
                                    ? "preview5"
                                    : images.length % 2 === 0
                                    ? "preview6"
                                    : "preview6 singular_grid"}>
                                    {
                                        images.map((img, i) => (
                                            <img src={img} key={i} alt="" />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='add_pics_inside1'>
                            <div className={images.length ? 'small_white_circle':'nonewhite_circle'}>
                                <CloseIcon />
                            </div>
                            <div
                                className='add_col'
                                onClick={() => { imageInuptRef.current.click() }}>
                                <div className='add_circle'>
                                    <AddPhotoAlternateIcon />
                                </div>
                                <span>Add Photos</span>
                                <span>or drag and drop</span>
                            </div>
                        </div>
                    )
                }
                {/* <div className='add_pics_inside2'>
            <div className='add_circle'>
                <PhoneIphoneIcon className='phone_icon'/>
            </div>

        </div> */}
            </div>
        </div>
    )
}

export default ImgPreview
