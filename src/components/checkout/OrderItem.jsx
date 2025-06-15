import { Grid } from '@mui/material';
import React from 'react';
import InvertColorsOffIcon from '@mui/icons-material/InvertColorsOff';



const OrderItem = ({ item }) => {

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <img
                        className="rounded-xl"
                        src={item.imageUrl}
                        alt=""
                    />
                </Grid>
                <Grid item xs={2}>
                    <img
                        className="w-[150px] h-[150px] rounded-xl bg-white/10"
                        src={item.imageColor}
                        alt=""
                    />
                </Grid>
                <Grid item xs={5}>
                    <p className='text-xl'>
                        Category: <span className='uppercase ml-2'>{item.category.name}</span>
                    </p>
                    <h3 className="text-2xl font-semibold mt-2">{item.name}</h3>
                    <div className="flex items-center mt-4">
                        <p className="text-xl text-gray-300 pr-2">Quantity: {item.quantity} | {item.nameColor}</p>
                        {item.color ? (
                            <div
                                style={{ backgroundColor: `${item.color}` }}
                                className='w-6 h-6 rounded-md border-2 border-gray-800 mt-1'
                            />
                        ) : (
                            <InvertColorsOffIcon fontSize="medium" className='mt-1 text-[#A4ABB6]'/>
                        )
                            
                        }
                    </div>
                </Grid>
                <Grid item xs={2} className="flex">
                    <div className="my-auto border border-gray-600 rounded-3xl text-center px-9 py-4 items-center flex">
                        <h3 className="text-2xl font-semibold ">{item.quantity * item.price}</h3>
                        <img
                            className='w-[1.5rem] h-[1.5rem] ml-2 mt-0.5'
                            src="https://rankedkings.com/img/rp.png"
                            alt=""
                        />
                    </div>
                </Grid>
            </Grid>
            <div className='border border-gray-600 my-5' />
        </>
    );

}


export default OrderItem;