import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableModal from '../../Component/DataTable/TableModal'
import { UserRow } from '../../Component/DataTable/Properties/DataSource'
import axiosInstance from '../../helper/axiosInstance'
import { useSelector } from 'react-redux'
const AllUsers = () => {
    const admin = useSelector(state => state.admin)
    const [user, setUser] = useState([])
    const [error, setError] = useState()
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [page, setPage] = useState(0);
    const title = "All User Data"
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosInstance.get(`/getAllUser?limit=5&skip=${page * 5}`,
                    {
                        headers: {
                            Authorization: `Bearer ${admin.token}`,
                            "content-type": "multipart/form-data"
                        }
                    })
                setUser(data)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchData()
    }, [update, page])
    const onUpdate = async (store) => {
        const { id, type } = store
        console.log(id, type);
        if (type == "deleted") {
            try {
                const { data: { success } } = await axiosInstance.delete(`/deleteUser/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${admin.token}`,
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
        } else if (type == "isVerified=true" || type == "isVerified=false") {
            try {
                const { data: { success } } = await axiosInstance.put(`/blockUser?${type}`, { id },
                    {
                        headers: {
                            Authorization: `Bearer ${admin.token}`,
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
            <Box sx={{ marginTop: '30px' }}>
                <TableModal
                    columns={UserRow}
                    data={user}
                    table="user"
                    // btnoff={true}
                    heading={title}
                    setError={setError}
                    setOpen={setOpen}
                    onUpdate={onUpdate}
                    open={open}
                    setPage={setPage}
                />
            </Box>
        </>
    )
}

export default AllUsers
