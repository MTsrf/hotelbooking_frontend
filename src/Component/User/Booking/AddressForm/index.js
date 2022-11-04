import { Box, Typography } from "@mui/material"
import { useState } from "react"
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import SmokeFreeOutlinedIcon from '@mui/icons-material/SmokeFreeOutlined';
import CameraswitchOutlinedIcon from '@mui/icons-material/CameraswitchOutlined';
import './AddressForm.scss'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Inp, Select } from "../../syledcomponent/StyledComponent";
import { Form, Formik, ErrorMessage } from 'formik'

const AddressForm = ({
    phone,
    setPhone,
    guest,
    setGuest,
    guestname,
    setGuestName,
    errorPhone,
    errorgeust,
    errguestname,
    addressSubmit }) => {

    return (
        <>
            <Box className='addressForm'>
                <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Delux Rooms</Typography>
                <Box className="first">
                    <Box className="breakfast">
                        <FreeBreakfastOutlinedIcon />
                        <Typography>Breakfast included in the price</Typography>
                    </Box>
                    <Box className="smok">
                        <SmokeFreeOutlinedIcon />
                        <Typography>No smoking</Typography>
                    </Box>
                    <Box className="view">
                        <CameraswitchOutlinedIcon />
                        <Typography>City View</Typography>
                    </Box>
                </Box>
                <Formik
                    enableReinitialize
                    initialValues={{
                        phone,
                        guest,
                        guestname
                    }}
                    onSubmit={
                        () => addressSubmit()
                    }

                >
                    {
                        ({ error, touched }) => (
                            <Form>
                                <Box className="second">
                                    <Typography sx={{ fontWeight: 'bold' }}>Phone Number</Typography>
                                    <PhoneInput
                                        country={"in"}
                                        enableSearch={true}
                                        name='phone_number'
                                        value={phone}
                                        className='inputphone'
                                        onChange={(phone) => setPhone(phone)}
                                    />
                                    {
                                        errorPhone && <Typography sx={{ color: 'red', fontSize: '10px' }}>
                                            {errorPhone}
                                        </Typography>
                                    }
                                </Box>
                                <Box className="fourth">
                                    <Box>
                                        <Typography sx={{ fontWeight: 'bold' }}>Guest</Typography>
                                        <Inp
                                            border={'1px solid lightgray'}
                                            value={guest}
                                            name="guest"
                                            onChange={(e) => { setGuest(e.target.value) }}
                                        />
                                        {
                                            errorgeust && <Typography sx={{ color: 'red', fontSize: '10px' }}>
                                                {errorgeust}
                                            </Typography>
                                        }
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 'bold' }}>Guest Full Name</Typography>
                                        <Inp
                                            border={'1px solid lightgray'}
                                            name="guest_name"
                                            value={guestname}
                                            onChange={(e) => { setGuestName(e.target.value) }}

                                        />
                                        {
                                            errguestname && <Typography sx={{ color: 'red', fontSize: '10px' }}>
                                                {errguestname}
                                            </Typography>
                                        }
                                    </Box>
                                </Box>
                            </Form>
                        )
                    }
                </Formik>

            </Box>
        </>
    )
}

export default AddressForm