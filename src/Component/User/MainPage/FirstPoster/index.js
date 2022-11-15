import { Button, Card, CardActions, CardContent, CardMedia, Paper, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './FirstPoster.scss'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../../helper/useFetch';

const FirstPoster = ({ data, loading }) => {
    const navigate = useNavigate()
    const store = useSelector((state) => state.store)
    const featured = store ? store : data
    const randomvalue = featured.sort(() => Math.random() - Math.random()).slice(0, 3)
    const [count, setCount] = useState([1, 2, 3])
    return (
        <Paper className='MainPaper'>
            <Box className='firstPosterMain'>
                <Box className='firstBox'>
                    <Box>
                        <Typography className='mid'>Travel with style</Typography>
                    </Box>
                    <Box>
                        <Typography className='head'>EXPLORE The<br />Stylish Properties</Typography>
                    </Box>
                    <Box>
                        <Typography>Because in the end, you won’t remember the time you spent working in the office or mowing your lawn. Climb that goddamn mountain</Typography>
                    </Box>
                </Box>
                <Box className='secondBox'>

                    {loading && <Box className='bannerBox'>
                        {
                            count.map((item, index) => (
                                <Box key={index}>
                                    <Card className='cardBox'>
                                        <Skeleton sx={{ height: 160, width: 250 }} animation="wave" variant="rectangular" />
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
                                </Box>
                            ))
                        }
                    </Box>}
                    {randomvalue && <Box className='bannerBox'>
                        {randomvalue?.map((item, index) => (
                            <Box key={index}>
                                <Card className='cardBox' onClick={() => { navigate(`/hotel/${item._id}`) }}>
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={item.images[0][0].url}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h7">
                                            {`${item?.property?.property_name.substring(0, 20)} ...`}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.property.city}

                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Box>))}
                    </Box>}

                </Box>
            </Box>

        </Paper >
    )
}

{/* {randomvalue.map((item, index) => (
                            <Box key={index}>
                                <Card className='cardBox'>
                                   <CardMedia
                                        component="img"
                                        height="160"
                                        image={item.images[0][0].url}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                       <Typography gutterBottom variant="h5" component="div">
                                            {item.channel}
                                        </Typography>
                                       <Typography variant="body2" color="text.secondary">
                                            {item.title}

                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Box>))} */}
export default FirstPoster
