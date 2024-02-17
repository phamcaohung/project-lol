import { Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import OrderCardItem from "./OrderCardItem";

const OrderCard = ({ order }) => {
    const navigate = useNavigate()

    // console.log(order);

    return (
        <div 
            onClick={() => navigate(`/account/order/${order.id}`)} 
            className="py-5 border border-gray-600 mt-10"
        >
            <Grid container spacing={1}>
                <Grid 
                    item xs={4} 
                    className="text-white font-semibold text-2xl"
                >
                    <div className="p-10">
                        <p className="mt-2">
                            <span className="text-gray-400 pr-5">
                                Order At:
                            </span>
                            {moment(order.createAt).format("MMMM DD, YYYY")}
                        </p>
                        <p className="mt-2">
                            <span className="text-gray-400 pr-5">
                                Order Status: 
                            </span>
                            {order.orderStatus}
                        </p>
                        <p className="mt-2">
                            <span className="text-gray-400 pr-5">
                                Name: 
                            </span>
                            {order.shippingAddress.lastName + " " + order.shippingAddress.firstName}
                        </p>
                        <p className="mt-2">
                            <span className="text-gray-400 pr-5">
                                Street Address:
                            </span>
                            {order.shippingAddress.streetAddress}
                        </p>
                        <p className="mt-2">
                            <span className="text-gray-400 pr-5">
                                City:
                            </span>
                            {order.shippingAddress.city}
                        </p>
                        <p className="mt-2">
                            <span className="text-gray-400 pr-5">
                                State:
                            </span>
                            {order.shippingAddress.state}
                        </p>
                        <p className="mt-2">
                            <span className="text-gray-400 pr-5">
                                Zip Code:
                            </span>
                            {order.shippingAddress.zipCode}
                        </p>
                        <p className="mt-2">
                            <span className="text-gray-400 pr-5">
                                Total Item:
                            </span>
                            {order.totalItem}
                        </p>
                        <div className="flex items-center mt-2">
                            <p className="mt-2">
                                <span className="text-gray-400 pr-5">
                                    Total Price:
                                </span>
                                {order.totalPrice}
                            </p>
                            <img 
                                className='w-[2rem] h-[2rem] ml-2 mt-3'
                                src="https://rankedkings.com/img/rp.png"
                                alt="" 
                            />
                        </div>
                    </div>
                </Grid>

                <Grid container item xs={8} className="overflow-y-auto max-h-[29rem]">
                    {order?.orderItem.map((item) => 
                        <Grid item xs={4} marginTop={5}>
                            <OrderCardItem item={item} key={item.id} />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </div>
    )
}

export default OrderCard