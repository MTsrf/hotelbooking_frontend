import { Box, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button, Input, Select, Text } from './StylesComponent'
import './RoomDetails.scss'
import axiosInstance from '../../../../helper/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { VENDOR_ACTIVE } from '../../../../redux/types'
import useFetch from '../../../../helper/useFetch'

const roomInfo = {
    room_name: "",
    room_type: "",
    no_of_rooms: "",
    view: "",
    no_of_persons: "",
    price: "",
    no_of_beds: "",
    checkin: "",
    checkout: "",
    bathroom:"",
    category: "",
    property: ""
}


const RoomDetails = ({ setError,setMessage,setValue }) => {

    const { vendor } = useSelector((vendor) => ({ ...vendor }))
    const dispatch = useDispatch()
    const [categorydata, setCategorydata] = useState([])
    const [ pro,setPro] = useState([])
    const [ errorbathroom,setErrorbathroom] = useState("")
    const [room, setRoom] = useState(roomInfo)
    const { room_name, room_type, no_of_rooms, view, no_of_persons, price, no_of_beds, checkin, checkout,bathroom,category,property } = room
    useEffect(() => {
        getAllCategory()
        getHotel()
    }, [])
    const getAllCategory = async () => {
        try {
            let { data } = await axiosInstance.get('/getCategory',
            {
                headers: {
                    Authorization: `Bearer ${vendor.token}`,
                    "content-type": "multipart/form-data",
                }
            }
            )
            setCategorydata(data)
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    const getHotel = async () => {
        try {
            console.log(vendor.token);
            let { data } = await axiosInstance.get(`/getHotel/${vendor.id}`,
            {
                headers: {
                    Authorization: `Bearer ${vendor.token}`,
                    "content-type": "multipart/form-data",
                }
            })
            console.log("hotel data");
            console.log(data);
            setPro(data)
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const handleRoomChange = async (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value })
    }
    const numberRegex = /^(0|[1-9]\d*)$/
    const roomValidation = Yup.object({
        room_name: Yup.string().required("Room name is required"),
        room_type: Yup.string().required("Room type is required"),
        no_of_rooms: Yup.string().required("No of rooms is required").matches(numberRegex, "Please Enter a number"),
        view: Yup.string().required("Room view is required"),
        no_of_persons: Yup.string().required("No of guest required").matches(numberRegex, "Please Enter a number"),
        price: Yup.string().required("Price is required").matches(numberRegex, "Please Enter a number"),
        no_of_beds: Yup.string().required("No of bed required").matches(numberRegex, "Please Enter a number"),
        checkin: Yup.string().required("Check In time is required"),
        checkout: Yup.string().required("Checkout time is required"),
        category: Yup.string().required("Please Select Category"),
        property: Yup.string().required("Please Select your property")
    })
    const roomSubmit = async () => {
        try {
            const { data:{roomData,success,message} } = await axiosInstance.post('/addRoom',{...room,vendor:vendor.id},
            {
                headers: {
                    Authorization: `Bearer ${vendor.token}`,
                    "content-type": "multipart/form-data",
                }
            })
            if (!success) {
                setError("Server Timeout Error")
            }
            setError("")
            setMessage(message)
            setTimeout(()=>{
                dispatch({ type: VENDOR_ACTIVE, payload:roomData})
                localStorage.setItem("temp",JSON.stringify(roomData))
                setMessage("")
            },2000)
        } catch (error) {
            setMessage("")
            setError(error.response.data.message)
        }
    }

   
    console.log(pro);
    return (
        <>
            <Box>
                <Formik
                    enableReinitialize
                    initialValues={{
                        room_name,
                        room_type,
                        no_of_rooms,
                        view,
                        no_of_persons,
                        price,
                        no_of_beds,
                        checkin,
                        checkout,
                        bathroom,
                        category,
                        property
                    }}
                    validationSchema={roomValidation}
                    onSubmit={
                        () => {               
                            if (bathroom === "") {
                                setErrorbathroom("Select Your Options")
                            }else{
                                setErrorbathroom("")
                                roomSubmit()
                            }    
                         }
                    }
                >
                    {
                        ({ errors, touched }) => (
                            <Form>
                                <Box className='room_choose'>

                                    <Paper className='first_Paper'>
                                        <Box className='heading'>
                                            <Typography variant='h7'>Select your Category</Typography>
                                        </Box>
                                        <Box className='select'>
                                            <Field as={Select}
                                            border={errors.category && '1px solid red'} 
                                            name='category'
                                            onChange={handleRoomChange} 
                                            >
                                                <option value="" hidden>
                                                    Choose Category
                                                </option>
                                                {
                                                    categorydata?.map((item, index) => (
                                                        <option value={item._id} key={index}>{item.category}</option>
                                                    ))
                                                }
                                            </Field>
                                            {errors.category && touched.category && <Text color="red">{errors.category}</Text>}
                                        </Box>
                                    </Paper>
                                    <Paper className='second_Paper'>
                                        <Box className='heading'>
                                            <Typography variant='h7'>Select your Property</Typography>
                                        </Box>
                                        <Box className='select'>
                                            <Select
                                            border={errors.property && '1px solid red'} 
                                            name='property'
                                            onChange={handleRoomChange} 
                                            >
                                                <option value='' hidden>
                                                    Choose Property
                                                </option>
                                                {
                                                    pro?.map((item,index)=>(
                                                        <option key={index} value={item._id}>{item.property_name}</option>
                                                    ))
                                                }

                                            </Select>
                                            {errors.property && touched.property && <Text color="red">{errors.property}</Text>}
                                        </Box>

                                    </Paper>
                                </Box>
                                <Box className='room_details_main'>

                                    <Paper className='first_Paper'>
                                        <Box className='heading'>
                                            <Typography variant='h7'>Room Details</Typography>
                                        </Box>
                                        <Box className='first_box'>
                                            <Box className='second_paper'>
                                                <Typography className='text'>Room Name</Typography>
                                                <Field as={Input}
                                                    className='input_field'
                                                    border={errors.room_name && '1px solid red'} 
                                                    type="text"
                                                    name='room_name'
                                                    onChange={handleRoomChange}
                                                    helperText={<ErrorMessage name='room_name' />}
                                                />
                                                  
                                                {/* {errors.room_name && touched.room_name ? (<div>{errors.room_name}</div>) : null} */}
                                            </Box>
                                            {errors.room_name && <Text color="red">{errors.room_name}</Text>}
                                            <Box className='second_paper'>
                                                <Typography className='text'>Choose Rooms Type</Typography>
                                                <Input className='input_field'
                                                    type="text"
                                                    border={errors.room_type && '1px solid red'} 
                                                    name='room_type'
                                                    onChange={handleRoomChange}
                                                    helperText={<ErrorMessage name='room_type' />}
                                                />
                                            </Box>
                                            {errors.room_type && <Text color="red">{errors.room_type}</Text>}
                                            <Box className='second_paper'>
                                                <Typography className='text'>
                                                    No.of Rooms
                                                </Typography>
                                                <Input className='input_field'
                                                    type="text"
                                                    border={errors.no_of_rooms && '1px solid red'} 
                                                    name='no_of_rooms'
                                                    onChange={handleRoomChange}
                                                    helperText={<ErrorMessage name='no_of_rooms' />}
                                                />
                                            </Box>
                                            {errors.no_of_rooms && <Text color="red">{errors.no_of_rooms}</Text>}
                                            <Box className='second_paper'>
                                                <Typography className='text'>
                                                    View
                                                </Typography>
                                                <Input className='input_field'
                                                    type="text"
                                                    border={errors.view && '1px solid red'} 
                                                    label='View'
                                                    name='view'
                                                    onChange={handleRoomChange}
                                                    helperText={<ErrorMessage name='view' />}
                                                />
                                            </Box>
                                            {errors.view && <Text color="red">{errors.view}</Text>}
                                            <Box className='second_paper'>
                                                <Typography className='text'>
                                                    Attached Bathroom
                                                </Typography>
                                                <RadioGroup
                                                    row
                                                    className='radio'
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    
                                                >
                                                    <Field as={FormControlLabel} value="Yes" onChange={handleRoomChange} name='bathroom' control={<Radio />} label="Yes" />
                                                    <Field as={FormControlLabel} value="No" onChange={handleRoomChange} name='bathroom' control={<Radio />} label="No" />

                                                </RadioGroup>
                                            </Box>
                                            {errorbathroom && <Text color="red">{errorbathroom}</Text>}
                                        </Box>
                                    </Paper>
                                    <Paper className='Second_Paper'>
                                        <Box className='heading'>
                                            <Typography variant='h7'>Base Property Price</Typography>
                                        </Box>
                                        <Box className='second_box'>
                                            <Box className='second_paper'>
                                                <Typography variant='h8' className='text'>
                                                    Base Price
                                                </Typography>
                                                <Input className='input_field'
                                                    name='price'
                                                    border={errors.price && '1px solid red'} 
                                                    onChange={handleRoomChange}
                                                    helperText={<ErrorMessage name='price' />}
                                                    type="text" />
                                            </Box>
                                            {errors.price && <Text color="red">{errors.price}</Text>}
                                            <Box className='second_paper'>
                                                <Typography className='text'>
                                                    No.of Persons Allowed
                                                </Typography>
                                                <Input className='input_field'
                                                    type="text"
                                                    border={errors.no_of_persons && '1px solid red'} 
                                                    name='no_of_persons'
                                                    onChange={handleRoomChange}
                                                    helperText={<ErrorMessage name='no_of_persons' />}
                                                />
                                            </Box>
                                            {errors.no_of_persons  && <Text color="red">{errors.no_of_persons}</Text>}
                                            <Box className='second_paper'>
                                                <Typography className='text'>
                                                    No.of Bed Allowed
                                                </Typography>
                                                <Input className='input_field'
                                                    type="text"
                                                    border={errors.no_of_beds && '1px solid red'} 
                                                    name='no_of_beds'
                                                    onChange={handleRoomChange}
                                                    helperText={<ErrorMessage name='no_of_beds' />}
                                                />
                                            </Box>
                                            {errors.no_of_beds && <Text color="red">{errors.no_of_beds}</Text>}
                                            <Box className='second_paper'>
                                                <Typography className='text2'>
                                                    Time
                                                </Typography>
                                                <Box className='box_time'>
                                                    <Box>
                                                        <Typography>
                                                            Check In:
                                                        </Typography>
                                                        <Input
                                                            type="text"
                                                            border={errors.checkin && '1px solid red'} 
                                                            name='checkin'
                                                            onChange={handleRoomChange}
                                                            helperText={<ErrorMessage name='checkin' />}
                                                        />
                                                    </Box>
                                                    <Box>
                                                        <Typography>
                                                            Check Out:
                                                        </Typography>
                                                        <Input
                                                            type="text"
                                                            name='checkout'
                                                            border={errors.checkout && '1px solid red'} 
                                                            onChange={handleRoomChange}
                                                            helperText={<ErrorMessage name='checkout' />}
                                                        />
                                                    </Box>
                                                </Box>
                                            </Box>
                                            {errors.checkin && <Text color="red">{errors.checkin}</Text>}
                                            {errors.checkout && <Text color="red">{errors.checkout}</Text>}
                                        </Box>
                                        <Box>
                                            <Button type="submit">Submit</Button>
                                        </Box>
                                    </Paper>

                                </Box>
        </Form>
    )
}
                </Formik >

            </Box >
        </>
    )
}

export default RoomDetails
