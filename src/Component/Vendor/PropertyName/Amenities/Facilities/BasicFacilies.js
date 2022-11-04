import { Box } from '@mui/material';
import React, { useState } from 'react'
import { Input, Button } from './Styled';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axiosInstance from '../../../../../helper/axiosInstance';

const basicInfo = {
    service: ""
}
const BasicFacilies = () => {
    const [serviceList, setServiceList] = useState([{ service: "" }]);
    const [ basic,setBasic] = useState(basicInfo)
    const { service } = basic
    const handleServiceChange = (e) => {
        const { name, value } = e.target;
        setBasic({ ...basic, [name]: value })
    };

    const handleServiceRemove = (index) => {
        const list = [...serviceList];
        list.splice(index, 1);
        setServiceList(list);
    };

    const handleServiceAdd = () => {
        setServiceList([...serviceList, { service: "" }]);
    };

    const serviceSchema = Yup.object({
        service: Yup.string().required("Amenities required")
    })

    const serviceSubmit = async()=>{
        try {
            
        } catch (error) {
            
        }
    }
    return (
        <>
            <Box>
                <Formik
                enableReinitialize
                initialValues={{
                    service
                }}
                validationSchema={serviceSchema}
                onSubmit={
                    ()=>serviceSubmit()
                }
                >
                    {
                        (formik) => (
                            <Form>
                                {serviceList.map((singleService, index) => (
                                    <Box key={index} className="services">
                                        <Box className="first-division">
                                            <Input hidden value="Basic" />
                                            <Input
                                                name="service"
                                                type="text"
                                                id="service"
                                                className='inputfield'
                                                onChange={handleServiceChange}
                                                helperText={<ErrorMessage name='service'/>}
                                            />
                                        </Box>
                                        {serviceList.length - 1 === index && serviceList.length < 6 && (
                                            <Box className="second-division">
                                                <AddIcon
                                                    type="button"
                                                    className='addicon'
                                                    onClick={handleServiceAdd}
                                                />
                                            </Box>
                                        )}
                                        {serviceList.length !== 1 && (
                                            <Box className="third-division">
                                                <DeleteOutlineIcon
                                                    type="button"
                                                    onClick={() => handleServiceRemove(index)}
                                                    className="remove-btn"
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                ))}
                                <Button type='submit'>Submit</Button>
                            </Form>
                        )
                    }
                </Formik>
            </Box>
        </>
    )
}

export default BasicFacilies
