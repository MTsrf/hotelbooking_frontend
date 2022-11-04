import React, { Fragment, useEffect, useState } from 'react'
import { forwardRef } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AddBox from '@mui/icons-material/AddBox'
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';
import Alert from '@mui/material/Alert'
import { useSelector } from 'react-redux'
// import  from 'mater'
import MaterialTable from "material-table";
import { Box, Button, ImageList } from '@mui/material';
import axiosInstance from '../../../../helper/axiosInstance';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const Table = () => {
    let { admin } = useSelector((admin)=>({...admin}))
    var columns = [
        { title: "id", field: "id", hidden: true },
        { title: "Category Name", field: "category" },
        { title: "Category Descriptions", field: "description" },
    ]
    const [data, setData] = useState([]);
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])
    const [success, setSuccess] = useState("")
    useEffect(() => {
        axiosInstance.get("/getAllCategory",
          {
            headers: {
              Authorization: `Bearer ${admin.token}`,
              "content-type": "multipart/form-data",
            },
          })
            .then(res => {
                setData(res.data.getData)
            })
            .catch(error => {
                console.log("Error")
            })
    }, [])

    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = []
        if (newData.category === undefined) {
            errorList.push("Please enter name")
        }
        if (newData.description === undefined) {
            errorList.push("Please enter a Descriptions")
        }

        if (errorList.length < 1) {
            axiosInstance.put(`/updateCategory/${oldData._id}`, newData,
              {
                headers: {
                  Authorization: `Bearer ${admin.token}`,
                  "content-type": "multipart/form-data",
                },
              })
                .then(res => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setSuccess(res.data.message)
                    setData([...dataUpdate]);
                    resolve()
                    setIserror(false)
                    setErrorMessages([])
                })
                .catch(error => {
                    setErrorMessages([error.response.data.message])
                    setIserror(true)
                    resolve()

                })
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()

        }

    }

    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if (newData.category === undefined) {
            errorList.push("Please enter name")
        }
        if (newData.description === undefined) {
            errorList.push("Please enter a Descriptions")
        }

        if (errorList.length < 1) { //no error
            axiosInstance.post("/addCategory", newData,
              {
                headers: {
                  Authorization: `Bearer ${admin.token}`,
                  "content-type": "multipart/form-data",
                },
              })
                .then(res => {
                    let dataToAdd = [...data];
                    dataToAdd.push(newData);
                    setData(dataToAdd);
                    setSuccess(res.data.message)
                    resolve()
                    setErrorMessages([])
                    setIserror(false)
                })
                .catch(error => {
                    setErrorMessages([error.response.data.message])
                    setIserror(true)
                    resolve()
                })
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }

    const handleRowDelete = (oldData, resolve) => {
        console.log(oldData);
        axiosInstance.post("/deleteCategory", oldData,
          {
            headers: {
              Authorization: `Bearer ${admin.token}`,
              "content-type": "multipart/form-data",
            },
          })
            .then(res => {
                setSuccess(res.data.message)
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve()
            })
            .catch(error => {
                setErrorMessages([error.response.data.message])
                setIserror(true)
                resolve()
            })
    }
    return (
        <Fragment>
            <Box>
                <Box>
                    <Grid item xs={10}>
                        <div>
                            {
                                success && <Alert severity="success">{success}</Alert>
                            }
                            {iserror &&
                                <Alert severity="error">
                                    {errorMessages.map((msg, i) => {
                                        return <div key={i}>{msg}</div>
                                    })}
                                </Alert>
                            }
                        </div>
                        <MaterialTable mt={90}
                            title="Add Category"
                            columns={columns}
                            data={data}
                            icons={tableIcons}
                            options={{
                                addRowPosition: "first",
                                headerStyle: { size: '100px', backgroundColor: "#505050", color: '#fff', fontWeight: "bold", textTransform: "uppercase" }
                            }}
                            editable={{
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve) => {
                                        handleRowUpdate(newData, oldData, resolve);

                                    }),
                                onRowAdd: (newData) =>
                                    new Promise((resolve) => {
                                        handleRowAdd(newData, resolve)
                                    }),
                                onRowDelete: (oldData) =>
                                    new Promise((resolve) => {
                                        handleRowDelete(oldData, resolve)
                                    }),
                            }}
                        />
                    </Grid>
                </Box>
            </Box>
        </Fragment >
    )
}

export default Table
