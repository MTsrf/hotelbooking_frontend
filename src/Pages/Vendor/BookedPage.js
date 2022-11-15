import { Box, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Booked, CancelRow } from '../../Component/DataTable/Properties/DataSource'
import TableModal from '../../Component/DataTable/TableModal';
import axiosInstance from '../../helper/axiosInstance';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';



export default function BookedPage() {
  const vendor = useSelector(state => state.vendor)
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const [booked, setBooked] = useState([]);
  const [value, setValue] = useState('1');
  const [cancel, setCancel] = useState([])
  const [completed, setCompleted] = useState([])
  const [error, setError] = useState()
  const [update, setUpdate] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(`/${path}`,
          {
            headers: {
              Authorization: `Bearer ${vendor.token}`,
              "content-type": "multipart/form-data"
            }
          })
        const bookedData = data?.filter((item) => {
          return item.isBooked === true
        })
        setBooked(bookedData)
        const cancelData = data?.filter((item) => {
          return item.cancel === true
        })
        setCancel(cancelData)
        const completedData = data?.filter((item) => {
          return item.completed === true
        })
        setCompleted(completedData)
      } catch (error) {
        setError(error.message)
      }
    }
    fetchData()
  }, [update]);

  const title = "Booking List"
  console.log("completed", completed);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onUpdate = async (store) => {
    const { id, type } = store
    console.log("hai", id, type);
    if (type == "cancel" || type == "completed") {
      try {
        const { data: { success } } = await axiosInstance.patch(`/updatedBooking?isBooked=false&${type}=true`, { id },
          {
            headers: {
              Authorization: `Bearer ${vendor.token}`,
              "content-type": "multipart/form-data"
            }
          })
        console.log(success);
        if (success) {
          setOpen(!open)
          setUpdate(prev => !prev)
        }
      } catch (error) {
        setError(error.message)
      }
    }
  }
  return (
    <>
      <Paper sx={{ width: '100%', maxWidth: '1600px', margin: 'auto', marginTop: '30px', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Upcoming" value="1" />
              <Tab label="Cancel" value="2" />
              <Tab label="Completed" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TableModal
              columns={Booked}
              data={booked}
              table="booking"
              heading={title}
              button={false}
              onUpdate={onUpdate}
              setOpen={setOpen}
              open={open}
            />
          </TabPanel>
          <TabPanel value="2">
            <TableModal
              columns={CancelRow}
              data={cancel}
              table="booking"
              heading={title}
              button={false}
            />
          </TabPanel>
          <TabPanel value="3">
            <TableModal
              columns={CancelRow}
              data={completed}
              table="booking"
              heading={title}
              button={false}
            />
          </TabPanel>
        </TabContext>
      </Paper>
    </>
  )
}
