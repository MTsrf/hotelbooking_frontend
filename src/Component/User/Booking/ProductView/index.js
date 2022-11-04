import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import './ProductView.scss'

const ProductView = ({product}) => {
    console.log(product[0].room_name);
    return (
        <>
            <Box className='productItem'>
                <img
                    src={product[0].images[0][0].url}
                    className="siImg"
                />
                <Box className='siDesc'>
                    <Typography className='siTitle'>{product[0].property.property_name}</Typography>
                    <Typography className="siDistance">{product[0].room_name}</Typography>
                    <Typography className="siTaxiOp">Room is availabile</Typography>
                    <Typography className="siSubtitle">
                        {product[0].property.address}
                    </Typography>
                    <Typography className="siFeatures"> {`${product[0].view} • ${product[0].property.city}`}</Typography>
                    <Typography className='siCancelOp'>Free cancellation</Typography>
                    <Typography className='siCancelOpSubtitle'>You can cancel later, so lock in this great price today!</Typography>
                </Box>

            </Box>
        </>
    )
}

export default ProductView