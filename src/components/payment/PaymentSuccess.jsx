import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../state/order/Action";
import { updatePayment } from "../../state/payment/Action";
import { Alert, AlertTitle, Grid, Paper, Typography, ButtonBase } from "@mui/material";
import OrderTraker from "../order/OrderTraker";
import AddressCard from "../addressCard/AddressCard";

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState()
    const [payerId, setPayerId] = useState()
    const [token, setToken] = useState()
    const { orderId } = useParams()
    const dispatch = useDispatch()
    const { order } = useSelector(store => store.order)
    
    const item = {
        totalDiscountedPrice: order?.totalDiscountedPrice,
        totalItem: order?.totalItem,
        discounted: order?.discounted,
        totalPrice: order?.totalPrice,
    }


    useEffect(() => {
        const urlParam = new URLSearchParams(window.location.search)

        setPaymentId(urlParam.get("paymentId"))
        setPayerId(urlParam.get("PayerID"))
        setToken(urlParam.get("token"))
    }, [])

    useEffect(() => {
        if(paymentId) {
            const data = {
                orderId, 
                paymentId,
                payerId, 
                token
            }

            dispatch(getOrderById(orderId))

            if(order?.paymentDetails.status === "PENDING")
                dispatch(updatePayment(data))   
        }
    }, [orderId, paymentId, dispatch])
    

    return (
        <div className="px-2 lg:px-36">
            <div className="flex flex-col justify-center items-center">
                <Alert
                    variant="filled"
                    severity="success"
                    sx={{
                        mb: 6,
                        width: "fit-content"
                    }}
                >
                    <AlertTitle>Payment Success</AlertTitle>
                    Congratulation Your Order Get Placed
                </Alert>
            </div>

            <OrderTraker activeStep={4}/>

            <div className="p-5 shadow-lg rounded-s-md border mt-5">
                <AddressCard address={order?.shippingAddress} item={item}/>
            </div>

            <Grid
                container
                className="space-y-5 py-5 pt-10"
            >
                {order?.orderItem.map((item) => (
                    <Paper key={order?.id} className="m-auto p-5 flex-grow-1 border rounded-md shadow mt-5">
                        <Grid container spacing={5} justifyContent="space-between">
                            <Grid item xs={3}>
                                <Typography className="flex justify-center">
                                    <ButtonBase sx={{ height: 200, }}>
                                        <img 
                                            className="w-auto h-auto"
                                            src={item.product.imageUrl}
                                            alt="" 
                                        />
                                    </ButtonBase>
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={5}>
                                <p className="font-semibold"> {item.product.title} </p>
                                <p className="opacity-70 mt-5">Tier: {item.product.tier} </p>
                                <p className="opacity-70 mt-5">Series: {item.product.series} </p>

                                <div className='flex space-x-5 items-center text-gray-900 pt-6'>
                                    {item.product.discountPercent === 0 ? (
                                        <p className='font semibold flex items-center'>
                                            Price: {item.price} 
                                            <img 
                                                className='w-[1.5rem] h-[1.5rem] ml-2'
                                                src="https://rankedkings.com/img/rp.png"
                                                alt="" 
                                            />
                                        </p>
                                    ) : (
                                        <>
                                            <p className='font semibold flex items-center'>
                                                {item.price} 
                                                <img 
                                                    className='w-[1.5rem] h-[1.5rem] ml-2'
                                                    src="https://rankedkings.com/img/rp.png"
                                                    alt="" 
                                                />
                                            </p>

                                            <p className='opacity-50 line-through flex items-center'>
                                                {item.discountedPrice} 
                                                <img 
                                                    className='w-[1.5rem] h-[1.5rem] ml-2'
                                                    src="https://rankedkings.com/img/rp.png"
                                                    alt="" 
                                                />
                                            </p>

                                            <p className='text-green-600 font-semibold'> {item.product.discountPercent}% Off</p>
                                        </>
                                    )}
                                </div>
                            </Grid>  

                            <Grid item xs={2} className="grid grid-cols-2 gap-4 content-center">
                                <div className="text-center">
                                    <p className="font-semibold">Quantity</p>
                                    <div className="py-1 px-7 border rounded-sm text-2xl mt-5">
                                        {item.quantity}
                                    </div>
                                </div>
                            </Grid>                          

                            <Grid item xs={2}>
                                <div className="text-center">
                                    <p className="font-semibold">Color: {item.color}</p>
                                    <ButtonBase sx={{ width: 150, height: 150 }}>
                                        <img 
                                            className="w-full h-auto object-cover mt-4"
                                            src={item.imageColor}
                                            alt="" 
                                        />
                                    </ButtonBase> 
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Grid>
        </div>
    )
}

export default PaymentSuccess