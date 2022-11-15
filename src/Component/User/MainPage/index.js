import React, { Fragment, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import './Main.scss'
import FirstPoster from './FirstPoster'
import SliderItems from './Slider'
import axiosInstance from '../../../helper/axiosInstance'
import { useDispatch } from 'react-redux'
import { PRODUCTS_DATA } from '../../../redux/types'
import HomeStay from './HomeStay'
// import useFetch from '../../../helper/useFetch'
import useFetch from '../../../helper/useFetch'

const Main = () => {
  const dispatch = useDispatch()
  const { data, error, loading } = useFetch('/getRoom')
  useEffect(() => {
    dispatch({ type: PRODUCTS_DATA, payload: data })
    localStorage.setItem('store', JSON.stringify(data))
  }, [data])
  // useEffect(()=>{
  //   getAllData()
  //   console.log("ddfdsssss");
  // },[])
  // const getAllData = async () => {
  //   setLoading(true)
  //   console.log("================");
  //   const { data } = await axiosInstance.get('/getRoom')
  //   console.log(data);
  //   console.log("================");
  //   dispatch({type:PRODUCTS_DATA,payload:data})
  //   localStorage.setItem('store',JSON.stringify(data))
  //   setLoading(false)

  // }


  return (
    <Fragment>
      <Box className='mainpage_box'>
        <Box className='containerBox'>
          <Box className='secondBox'>
            <FirstPoster data={data} loading={loading} />
          </Box>
          <Box className='thirdBox'>
            <SliderItems data={data} loading={loading} />
          </Box>
          <Box className='thirdBox' >
            <HomeStay data={data} loading={loading} />
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}

export default Main
