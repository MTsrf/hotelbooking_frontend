import { Box } from '@mui/material'
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from '../../helper/axiosInstance';
import './DataTable.scss'
import { DataGrid } from '@mui/x-data-grid'
import SearchBar from 'material-ui-search-bar'

const DataTable = ({ columns, data }) => {
  const location = useLocation();
  const path = location?.pathname?.split("/")[3];
  const [list, setList] = useState();


  useEffect(() => {
    setList(data);
  }, [data]);

  const [searched, setSearched] = useState("");
  console.log(list);
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) { }
  };
  let count = list?.length ? list : 5;
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <Box className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <Box className="viewButton">View</Box>
            </Link>
            <Box
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </Box>
          </Box>
        );
      },
    },
  ];

  const requestSearch = (searchedVal) => {
    const filteredRows = data?.filter((row) => {
      return row.property.property_name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setList(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <>
      <Box className="datatable">
        <Box className="datatableTitle">
          {path}
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
          
        </Box>
        {/* <Box className='search'>
        <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </Box> */}
        <DataGrid
          className="datagrid"
          rows={count}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id
          }
        />
        
      </Box>
    </>
  )
}


export default DataTable