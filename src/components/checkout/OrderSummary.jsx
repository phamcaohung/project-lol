import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { getOrderByPublicId } from "../../state/order/Action";
import { useLocation, useParams } from "react-router-dom";
import { createPayment } from "../../state/payment/Action";
import moment from "moment/moment";
import OrderItem from "./OrderItem";
import { CustomChip } from "../../refactor/CustomStyle";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { formatNumberPhone } from "../../refactor/utils";


const OrderSummary = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const orderId = searchParams.get("order_id")
    const param = useParams()
    const { order } = useSelector(store => store.order)

    useEffect(() => {
        dispatch(getOrderByPublicId(orderId || param.orderId))
    }, [dispatch, orderId, param.orderId])


    const handleCheckout = () => {
        dispatch(createPayment(orderId))
    }

    return (
        <div className="text-white bg-[#111827]">
            <div className="pl-10">
                <h1 className="text-4xl font-bold">Order ID: {orderId}</h1>
                <h3 className="text-2xl mt-8">
                    {moment(order?.orderDate).format("MMMM DD, YYYY")} {" "}
                    at {moment(order?.orderDate).hour()}h : {moment(order?.orderDate).minute()}m {" "}
                    from Draft Orders
                </h3>
            </div>

            <Grid container marginTop={5} spacing={5}>
                <Grid item xs={12} sm={8} >
                    <div className="border border-gray-600 rounded-xl p-10">
                        <h2 className="text-3xl mb-5 font-bold">Order Items</h2>
                        {order?.orderItem.map((item) =>
                            <OrderItem item={item} />
                        )}
                    </div>

                    <div className="border border-gray-600 rounded-xl p-10 mt-10">
                        <h2 className="text-3xl mb-5 font-bold">Order Summary</h2>
                        <CustomChip
                            label={order?.paymentDetails?.status}
                        />

                        <Grid container marginTop={3}>
                            <Grid item xs={8}>
                                <p className="text-xl">Subtotal</p>
                                <p className="text-xl mt-4">Discount</p>
                                <p className="text-xl mt-4">Shipping</p>
                                <p className="text-xl font-bold mt-5">Total</p>
                            </Grid>
                            <Grid item xs={3}>
                                <p className="text-xl">{order?.totalItem}</p>
                                <p className="text-xl mt-4">New customer</p>
                                <p className="text-xl mt-4">Free shipping (0.0 ib)</p>
                                <p className="text-xl font-bold mt-5">Total</p>
                            </Grid>
                            <Grid item xs={1}>
                                <div className="flex items-center">
                                    <p className="text-xl">{order?.totalPrice}</p>
                                    <img
                                        className='w-[1.5rem] h-[1.5rem] ml-2 mt-0.5'
                                        src="https://rankedkings.com/img/rp.png"
                                        alt=""
                                    />
                                </div>
                                <div className="flex items-center mt-4">
                                    <p className="text-xl">{order?.totalDiscountedPrice}</p>
                                    <img
                                        className='w-[1.5rem] h-[1.5rem] ml-2 mt-0.5'
                                        src="https://rankedkings.com/img/rp.png"
                                        alt=""
                                    />
                                </div>
                                <div className="flex items-center mt-4">
                                    <p className="text-xl">0</p>
                                    <img
                                        className='w-[1.5rem] h-[1.5rem] ml-2 mt-0.5'
                                        src="https://rankedkings.com/img/rp.png"
                                        alt=""
                                    />
                                </div>
                                <div className="flex items-center mt-5">
                                    <p className="text-xl">{order?.totalPrice}</p>
                                    <img
                                        className='w-[1.5rem] h-[1.5rem] ml-2 mt-0.5'
                                        src="https://rankedkings.com/img/rp.png"
                                        alt=""
                                    />
                                </div>
                            </Grid>
                        </Grid>

                        <div className='border border-gray-600 mt-14' />
                        <div className="flex justify-between pt-10">
                            <p className="text-xl">Review your order at a glance on the Order Summary page.</p>
                            <Button
                                sx={{
                                    px: "1.5rem",
                                    py: "0.5rem",
                                    border: '1px solid gray',
                                    color: "white",
                                    fontWeight: "semibold",
                                    fontSize: '1rem',
                                    borderRadius: "10px",
                                    ":hover": {
                                        bgcolor: "#56F000",
                                        color: "black",
                                        fontWeight: "bold",
                                    },
                                }}
                            >
                                Send Invoice
                            </Button>
                            {order?.paymentDetails?.status !== 'COMPLETED' &&
                                <Button
                                    sx={{
                                        px: "1.5rem",
                                        py: "0.5rem",
                                        bgcolor: "#2DCCFF",
                                        color: "black",
                                        fontWeight: "bold",
                                        fontSize: '1rem',
                                        borderRadius: "10px",
                                        ":hover": {
                                            bgcolor: "#56F000",
                                        }
                                    }}
                                    onClick={handleCheckout}
                                >
                                    Collect Payment
                                </Button>
                            }
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <div className="border border-gray-600 rounded-xl p-10">
                        <div className="flex justify-between">
                            <h2 className="text-3xl mb-5 font-bold">Notes</h2>
                            <BorderColorIcon fontSize="large" sx={{ color: "#8DDC26" }} />
                        </div>
                        <p className="text-lg">{order?.note}</p>
                    </div>
                    <div className="border border-gray-600 rounded-xl p-10 mt-10">
                        <div className="flex justify-between">
                            <h2 className="text-3xl mb-5 font-bold">Customer</h2>
                            <KeyboardArrowDownIcon sx={{ color: "#8DDC26", fontSize: "45px" }} />
                        </div>
                        <div className="flex items-center">
                            <PersonIcon fontSize="medium" sx={{ color: "#8DDC26" }} />
                            <h4 className="text-xl pl-2">{order?.user?.firstName} {order?.user?.lastName}</h4>
                        </div>
                        <div className="flex items-center mt-2">
                            <ShoppingBagIcon fontSize="medium" sx={{ color: "#8DDC26" }} />
                            <h4 className="text-xl pl-2">1 Order</h4>
                        </div>
                        <p className="text-lg mt-2">Customer is tax-exempt</p>
                    </div>

                    <div className="border border-gray-600 rounded-xl p-10 mt-10">
                        <div className="flex justify-between">
                            <h2 className="text-3xl mb-5 font-bold">Contact Information</h2>
                            <BorderColorIcon fontSize="large" sx={{ color: "#8DDC26" }} />
                        </div>
                        <div className="flex items-center">
                            <EmailIcon fontSize="medium" sx={{ color: "#8DDC26" }} />
                            <h4 className="text-xl pl-2">{order?.user?.email}</h4>
                        </div>
                        <div className="flex items-center mt-2">
                            {order?.user?.mobile ? (
                                <>
                                    <PhoneIcon fontSize="medium" sx={{ color: "#8DDC26" }} />
                                    <h4 className="text-xl pl-2">{order?.user?.mobile}</h4>
                                </>
                            ) : (
                                <h4 className="text-xl">No Phone Number</h4>
                            )}
                        </div>
                    </div>

                    <div className="border border-gray-600 rounded-xl p-10 mt-10">
                        <div className="flex justify-between">
                            <h2 className="text-3xl mb-5 font-bold">Shipping address</h2>
                            <BorderColorIcon fontSize="large" sx={{ color: "#8DDC26" }} />
                        </div>
                        <div className="flex items-center">
                            <PersonIcon fontSize="medium" sx={{ color: "#8DDC26" }} />
                            <h4 className="text-xl pl-2">{order?.shippingAddress?.firstName} {order?.shippingAddress?.lastName}</h4>
                        </div>
                        <div className="mt-2">
                            <h4 className="text-xl">
                                Status: <CustomChip label={order?.shippingAddress?.status} bgColor={order?.shippingAddress?.status} className={'ml-4'} />
                            </h4>
                            <h4 className="text-xl mt-2">
                                Moblie: {formatNumberPhone(order?.shippingAddress?.mobile)}
                            </h4>
                            <h4 className="text-xl mt-2">
                                Address: {order?.shippingAddress?.streetAddress}
                            </h4>
                            <h4 className="text-xl mt-2">
                                City: {order?.shippingAddress?.city}
                            </h4>
                            <h4 className="text-xl mt-2">
                                State: {order?.shippingAddress?.state}
                            </h4>
                            <h4 className="text-xl mt-2">
                                Zip code: {order?.shippingAddress?.zipCode}
                            </h4>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>


    )
}

export default OrderSummary