import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TableModal from '../../Component/DataTable/TableModal'
import axiosInstance from '../../helper/axiosInstance'
import { allHotel } from '../../Component/DataTable/Properties/DataSource'
const AllHotel = () => {
    const admin = useSelector(state => state.admin)
    const [hotel, setHotel] = useState([])
    const [error, setError] = useState()
    const title = "All Hotel Data"
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosInstance.get(`/getAllHotel?limit=5&skip=${page * 5}`,
                    {
                        headers: {
                            Authorization: `Bearer ${admin.token}`,
                            "content-type": "multipart/form-data"
                        }
                    })
                setHotel(data)
            } catch (error) {
                setError(error.response.data.message)
            }
        }
        fetchData()
    }, [update, page])
    const onUpdate = async (store) => {
        console.log(store);
        const { id, type } = store
        try {
            const { data: { success } } = await axiosInstance.patch(`/blockRoom?${type}`, { id },
                {
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                        "content-type": "multipart/form-data"
                    }
                })
            if (success) {
                setOpen(!open)
                setUpdate(prev => !prev)
            }

        } catch (error) {
            setError(error.response.data.message)
        }
    }
    return (
        <>
            <Box sx={{ marginTop: '30px' }}>
                <TableModal
                    columns={allHotel}
                    data={hotel}
                    heading={title}
                    table="hotel"
                    setOpen={setOpen}
                    open={open}
                    setPage={setPage}
                    onUpdate={onUpdate}
                />
            </Box>
        </>
    )
}

export default AllHotel
