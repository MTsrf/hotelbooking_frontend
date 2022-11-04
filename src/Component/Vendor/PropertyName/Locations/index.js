import { Alert, Box, Paper, TextField, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import axiosInstance from '../../../../helper/axiosInstance'

import './Location.scss'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Button = styled.button`
  cursor: pointer;
  font-size: 16px;
  border-radius: 3px;
  color: white;
  background-color: #3f51b5;
  padding: 15px 0;
  width:100%;
  border:2px solid #3f51b5;
  transition: 0.5s all ease-out;

  &:hover {
    background-color: #5c6bc0;
    color: white;
  }
`;
const addressInfos = {
  address: "",
  city: "",
  street: "",
  landmark: "",
  country: "",
  state: "",
  pincode: ""
}
const Locations = ({ setValue, setError, setMessage }) => {
  const { temp } = useSelector((temp) => ({ ...temp }))
  const { vendor } = useSelector((vendor) => ({ ...vendor }))
  console.log(vendor);

  const [location, setLocation] = useState(addressInfos)
  const { address, city, street, landmark, country, state, pincode } = location
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value })
  }

  const addressValidation = Yup.object().shape({
    address: Yup.string().required("Current address required"),
    city: Yup.string().required("City required"),
    street: Yup.string().required("Street address required"),
    landmark: Yup.string().required("Landmark address required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string().required("Pincode is required").min(6, "Please enter 6 character")
  })


  const addressSubmit = async () => {
    try {
      const { data: { pushlocation, success, message } } = await axiosInstance.post('/addLocation', { ...location, hotel: temp._id },
        {
          headers: {
            Authorization: `Bearer ${vendor.token}`,
            "content-type": "multipart/form-data",
          }
        })
      setError("")
      setMessage(message)
      if (!success) {
        setError("sumbitting error occured")
      }
      setValue("3")
    } catch (error) {
      setMessage("")
      setError(error.response.data.message)
    }
  }
  return (
    <Fragment>
      <Paper className='address_header'>
        <Box className='header_box_address'>
          <Box className='heading_address'>
            <Typography variant='h6'>
              Add your Property Address
            </Typography>
          </Box>
          <Formik
            enableReinitialize
            initialValues={{
              address,
              city,
              street,
              landmark,
              country,
              state,
              pincode
            }}
            validationSchema={addressValidation}
            onSubmit={
              () => addressSubmit()
            }
          >
            {
              (formik) => (
                <Form>
                  <Box className='address_sub'>
                    <Typography>
                      Address :
                    </Typography>
                    <Field as={TextField}
                      size='small'
                      name='address'
                      fullWidth
                      type='text'
                      label='Address'
                      onChange={handleAddressChange}
                      helperText={<ErrorMessage name="address" />}
                    />
                  </Box>
                  <Box className='address_sub'>
                    <Typography>
                      City :
                    </Typography>
                    <Field as={TextField}
                      size='small'
                      name='city'
                      fullWidth
                      type='text'
                      label='City'
                      onChange={handleAddressChange}
                      helperText={<ErrorMessage name='city' />}
                    />
                  </Box>
                  <Box className='address_sub'>
                    <Typography>
                      Street :
                    </Typography>
                    <Field as={TextField}
                      size='small'
                      name='street'
                      fullWidth
                      type='text'
                      label='Street'
                      onChange={handleAddressChange}
                      helperText={<ErrorMessage name='street' />}
                    />
                  </Box>
                  <Box className='address_sub'>
                    <Typography>
                      Landmark :
                    </Typography>
                    <Field as={TextField}
                      size='small'
                      name='landmark'
                      fullWidth
                      type='text'
                      label='Landmark'
                      onChange={handleAddressChange}
                      helperText={<ErrorMessage name='landmark' />}
                    />
                  </Box>
                  <Box className='address_subi'>
                    <Box className='address_line'>
                      <Typography>
                        Country :
                      </Typography>
                      <Field as={TextField}
                        size='small'
                        name='country'
                        type='text'
                        fullWidth
                        label='Country'
                        onChange={handleAddressChange}
                        helperText={<ErrorMessage name='country' />}
                      />
                    </Box>
                    <Box className='address_line'>
                      <Typography>
                        State :
                      </Typography>
                      <Field as={TextField}
                        size='small'
                        name='state'
                        fullWidth
                        type='text'
                        label='State'
                        onChange={handleAddressChange}
                        helperText={<ErrorMessage name='state' />}
                      />
                    </Box>
                  </Box>
                  <Box className='address_sub'>
                    <Typography>
                      Pincode :
                    </Typography>
                    <Field as={TextField}
                      size='small'
                      name='pincode'
                      type='number'
                      fullWidth
                      label='Pincode'
                      onChange={handleAddressChange}
                      helperText={<ErrorMessage name='pincode' />}
                    />
                  </Box>
                  <Box >
                    <Button type="submit">Submit</Button>
                  </Box>
                </Form>
              )
            }
          </Formik>
        </Box>
      </Paper>
    </Fragment>
  )
}

export default Locations
