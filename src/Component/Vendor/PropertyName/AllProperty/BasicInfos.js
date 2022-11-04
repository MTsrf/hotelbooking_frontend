import { Box, Button, Grid, Paper, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SelectCategory from './Select'
import { makeStyles } from "@material-ui/core/styles";
import axiosInstance from '../../../../helper/axiosInstance'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { VENDOR_ACTIVE } from '../../../../redux/types';
const style = makeStyles({
    titleItemRight: {
        color: "white",
        backgroundColor: "#3f51b5",
        top: "50%",
        height: 60,
        float: "right",
        position: "relative",
        transform: "translateY(-50%)"
    }
});

const basicInfos = {
    property_name: "",
    property_details: "",
    phone_number: "",
    email: "",
    categories: ""
}
const BasicInfos = ({ setValue, setError, setMessage }) => {
    const { vendor } = useSelector((vendor) => ({ ...vendor }))
    const dispatch = useDispatch()
    const classes = style();
    const [info, setInfo] = useState(basicInfos)
    const [errorcat, setErrorcat] = useState(false)
    const { property_name, property_details, phone_number, email, categories } = info
    const [categorydata, setCategorydata] = useState([])
    const [check, setCheck] = useState("")
    const handleBasicChange = async (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value })
    }

    const catSubmit = async (id) => {
        setCheck(id)
    }


    useEffect(() => {
        getAllCategory()
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

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const basicValidations = Yup.object({
        property_name: Yup.string().required("Property name required").min(5, "Minimum 6 letter required"),
        property_details: Yup.string().required("Property details required").min(5, "Minimum 6 letter required"),
        phone_number: Yup.string()
            .required("Phone number is required")
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(10, "Phone number to short")
            .max(10, "Phone number to long"),
        email: Yup.string().required("Email address required").email("Enter a valid email address"),
        categories: Yup.string().required("Please Choose Category")
    })


    const handleSubmit = async () => {
        try {
            const { data: { postData, success, message } } = await axiosInstance.post('/addHotel',{...info,vendor:vendor.id},
            {
                headers: {
                    Authorization: `Bearer ${vendor.token}`,
                    "content-type": "multipart/form-data",
                }
            })
            setError("")
            setMessage(message)
            if (!success) {
                return setError("Error occurred submit data")
            }
            setValue("2")
            dispatch({ type: VENDOR_ACTIVE, payload: postData })
            localStorage.setItem("temp", JSON.stringify(postData))
            
        } catch (error) {
            setMessage("")
            setError(error.response.data.message)
        }
    }

    return (
        <React.Fragment>
            <Box component={Paper} className='basic-address-info'>
                <Box className='sub_heading'>
                    <Typography variant='h6'>Choose Your Category</Typography>
                </Box>
                <Formik
                    enableReinitialize
                    initialValues={{
                        property_name,
                        property_details,
                        phone_number,
                        email,
                        categories
                    }}
                    validationSchema={basicValidations}
                    onSubmit={
                        () => handleSubmit()
                    }
                >
                    {
                        (formik) => (
                            <Form>
                                <Box className='Basic-category' >
                                    <Grid item sx={6} className='grid-category'>
                                        <SelectCategory categorydata={categorydata} handleBasicChange={handleBasicChange} catSubmit={catSubmit} ErrorMessage={ErrorMessage} errorcat={errorcat} />
                                    </Grid>
                                    {
                                        check && <Grid item sx={6} className='grid-description'>
                                            <Typography>{check}</Typography>
                                        </Grid>
                                    }
                                </Box>
                                <Box className='sub_heading'>
                                    <Typography variant='h6'>
                                        Basic Informations
                                    </Typography>
                                </Box>
                                <Box className='property-Details'>
                                    <Grid className='small-heading'>
                                        <Typography variant='h7'>
                                            Property Name
                                        </Typography>
                                        <Field as={TextField}
                                            className='small-filed'
                                            fullWidth
                                            onChange={handleBasicChange}
                                            size='small'
                                            name='property_name'
                                            label='Property Name'
                                            type='text'
                                            helperText={<ErrorMessage name="property_name" />}
                                        />
                                    </Grid>
                                    <Grid className='small-heading'>
                                        <Typography variant='h7' >
                                            Property Details
                                        </Typography>
                                        <Field as={TextField}
                                            fullWidth
                                            name='property_details'
                                            className='small-filed'
                                            multiline
                                            label="Propert Details"
                                            rows={4}
                                            type='text'
                                            onChange={handleBasicChange}
                                            helperText={<ErrorMessage name="property_details" />}
                                        />

                                    </Grid>
                                </Box>
                                <Grid className='sub_heading'>
                                    <Typography variant='h6'>Contact Details</Typography>
                                </Grid>
                                <Box className='property-Details'>
                                    <Grid className='small-heading'>
                                        <Typography variant='h7'>
                                            Phone Number
                                        </Typography>
                                        <Field as={TextField}
                                            fullWidth
                                            name='phone_number'
                                            onChange={handleBasicChange}
                                            size='small'
                                            type='tel'
                                            className='small-filed'
                                            label='Phone Number'
                                            helperText={<ErrorMessage name="phone_number" />}
                                        />
                                    </Grid>
                                    <Grid className='small-heading'>
                                        <Typography>
                                            Email Address
                                        </Typography>
                                        <Field as={TextField}
                                            fullWidth
                                            name='email'
                                            onChange={handleBasicChange}
                                            size='small'
                                            type='email'
                                            className='small-filed'
                                            label='Email Address'
                                            helperText={<ErrorMessage name="email" />}
                                        />
                                    </Grid>
                                </Box>
                                <Box className='button-basicInfo'>
                                    <Button type="submit" variant='contained' onClick={() => setErrorcat(!categories)} className={classes.titleItemRight}>Save and Continue</Button>
                                </Box>
                            </Form>
                        )
                    }
                </Formik>
            </Box>
        </React.Fragment>
    )
}

export default BasicInfos
