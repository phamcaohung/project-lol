import React, { useEffect } from "react";
import AddressCard from "../addressCard/AddressCard";
import CartItem from "../cart/CartItem"
import { Button } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../state/order/Action";
import { useLocation } from "react-router-dom";
import { createPayment } from "../../state/payment/Action";

const OrderSummary = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const orderId = searchParams.get("order_id")
    const { order } = useSelector(store => store.order)

    console.log("order: ", order);

    useEffect(() => {
        dispatch(getOrderById(orderId))
    }, [orderId])


    const handleCheckout = () => {
        dispatch(createPayment(orderId))
    }

    return (
        <div>
            <div className="p-5 shadow-lg rounded-s-md border">
                <AddressCard address={order?.shippingAddress}/>
            </div>

            <div className="mt-10">
                <div className="lg:grid grid-cols-3 relative">
                    <div className="col-span-2">
                        {order?.orderItem.map((item) => <CartItem item={item} key={item.id}/>)}
                    </div>

                    <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
                        <div className="border p-10">
                            <p className="uppercase font-bold opacity-60 pb-4">Price detail</p>
                            <hr/>
                            <div className="space-y-3 font-semibold mb-10">
                                <div className="flex justify-between pt-3 text-black">
                                    <span>Price</span>
                                    <span className="flex items-center">
                                        {order?.totalPrice} 
                                        <img 
                                            className='w-[1.5rem] h-[1.5rem] ml-2'
                                            src="https://rankedkings.com/img/rp.png"
                                            alt="" 
                                        />
                                    </span>
                                </div>

                                <div className="flex justify-between pt-3">
                                    <span>Disccount</span>
                                    <span className="text-green-600 flex items-center">
                                        {order?.discounted} 
                                        <img 
                                            className='w-[1.5rem] h-[1.5rem] ml-2'
                                            src="https://rankedkings.com/img/rp.png"
                                            alt="" 
                                        />
                                    </span>
                                </div>

                                <div className="flex justify-between pt-3">
                                    <span>Delivery Charge</span>
                                    <span className="text-green-600">Free</span>
                                </div>

                                <div className="flex justify-between pt-3 font-bold">
                                    <span>Total Amount  </span>
                                    <span className="text-green-600 flex items-center">
                                        {order?.totalDiscountedPrice}
                                        <img 
                                            className='w-[1.5rem] h-[1.5rem] ml-2'
                                            src="https://rankedkings.com/img/rp.png"
                                            alt="" 
                                        />
                                    </span>
                                </div>
                            </div>
                            <Button
                                className="w-full mt-5"
                                color='secondary'
                                variant='contained' 
                                sx={{
                                    px: "2.5rem",
                                    py: ".7rem",
                                    bgcolor: "#9155fd"
                                }}
                                onClick={handleCheckout}
                            >
                                    Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
    )
}

export default OrderSummary