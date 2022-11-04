import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Tab } from '@mui/material';
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../helper/axiosInstance';
import VerificationTable from './AllVendor/VerificationTable';
import { useSelector } from 'react-redux'
import ApprovedTables from './AllVendor/ApprovedTables';
import './AllVendor.scss'
const Vendor = () => {
    const { admin } = useSelector((admin) => ({ ...admin }))
    const [value, setValue] = React.useState('1');
    const [provider, setProvider] = useState([])
    const [ message,setMessage ] = useState("")
    const [ bmessage,setBmessage] = useState("")
    const [ berror,setBerror ] = useState("")
    const [verified, setVerified] = useState([])
    const [error, setError] = useState("")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        getAllVendor()
    }, [])

    const getAllVendor = async () => {
        try {
            const { data } = await axiosInstance.get("/getAllVendor",
                {
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                        "content-type": "multipart/form-data",
                    }
                })
            const notverified = await data?.filter((item) => {
                return item.adminVerified === false && item.isVerified === true;
            })
            setVerified(notverified)

            const verify = await data?.filter((item) => {
                return item.adminVerified === true && item.isVerified === true;
            })
            setProvider(verify)

        } catch (error) {
            setError(error.response.data.message)
        }
    }


    const handleApprove = async (Id) => {
        try {
            console.log(admin.token);
            console.log(Id);
            const {data} = await axiosInstance.post("/approveVendor/", Id,
                {
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                        "content-type": "multipart/form-data",
                    },
                })
                console.log(data);
                const { message,success,...rest} = data
                setMessage(message)
                getAllVendor()            
        } catch (error) {
            setError(error.response.data.message)
        }
    }


    const handleBlocked = async(provide) =>{
       try {
        console.log(provide);
        const { data } = await axiosInstance.post("/blockedVendor",provide,
        {
            headers:{
                Authorization: `Bearer ${admin.token}`,
                "content-type":"multipart/form-data"
            },
        }
        )
        const { message,success,...rest} = data
        setBmessage(message)
        getAllVendor()
       } catch (error) {
        setBerror(error.response.data.message)
       }
    }


    const handleUnblock = async(provide)=>{
        try {
            const { data } = await axiosInstance.post("/unblockVendor",provide,{
                headers:{
                    Authorization: `Bearer ${admin.token}`,
                    "content-type":"multipart/form-data"
                },
            })
            const { message ,success,...rest} = data
            setBmessage(message)
            getAllVendor()
        } catch (error) {
            
        }
    }


    return (
        <React.Fragment>
            <Box className='category_head'>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Hotel Owner Verifications" value="1" />
                            <Tab label="All Owners" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><VerificationTable verified={verified} handleApprove={handleApprove} message={message}/></TabPanel>
                    <TabPanel value="2"><ApprovedTables provider={provider} handleBlocked={handleBlocked} bmessage={bmessage} handleUnblock={handleUnblock}/></TabPanel>
                </TabContext>
            </Box>
        </React.Fragment>
    )
}

export default Vendor
