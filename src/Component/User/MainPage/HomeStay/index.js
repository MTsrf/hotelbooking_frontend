import React, { useState } from 'react'
import Slider from "react-slick";
import './slick.css'
import './slick-theme.css'
import { Box, Card, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import './Slider.scss'
import { useSelector } from 'react-redux';

const HomeStay = ({data,loading}) => {
    const store = useSelector((state)=>state.store)
    const homestay = store?store:data
    const [ count , setCount ] = useState([1,2,3,4,5,6])
    const home = homestay?.filter((item)=>{
        return item.category.category === "HomeStay"
    })
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,

    };
    return (
        <>
            <Box className='sliderBox'>
                <Box className='firstBox'>
                    <Box className='smallContainer'>
                        <Typography variant='h6' component='h1'>
                            Best Holiday Package
                        </Typography>
                    </Box>
                    <Box>
                    {
                            loading ? (<Slider {...settings} className='slidershow'>
                                {count?.map((item, index) => (
                                    <Box key={index}>
                                        <Card className='sekelBox'>
                                            <Skeleton className='imgskel' nimation="wave" variant="rectangular" />
                                            <CardContent>
                                                <Skeleton
                                                    animation="wave"
                                                    height={10}
                                                    width="50%"
                                                    style={{ marginBottom: 6 }}
                                                />
                                                <Skeleton
                                                    animation="wave"
                                                    height={10}
                                                    width="80%"
                                                    style={{ marginBottom: 6 }}
                                                />
                                            </CardContent>

                                        </Card>
                                    </Box>))}
                            </Slider>) : <Slider {...settings} className='slidershow'>
                                {home?.map((item, index) => (
                                    <Box key={index}>
                                        <Card className='cardBox'>
                                            <CardMedia
                                                component="img"
                                                height="160"
                                                image={item.images[0][0].url}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    {`${item.property.property_name.substring(0, 20)}...`}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.property.city}
                                                </Typography>
                                            </CardContent>

                                        </Card>
                                    </Box>))}
                            </Slider>
                        }
                    </Box>
                   
                </Box>
            </Box>
        </>
    )
}

export default HomeStay
