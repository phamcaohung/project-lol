import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistoryByUser } from "../../state/order/Action";

const orderStatus = [
    { lable: "On The Way", value: "on_the_way" },
    { lable: "Delivered", value: "delivered" },
    { lable: "Cancelled", value: "cancelled" },
    { lable: "Returned", value: "returned" },
]

const Order = () => {
    const dispatch = useDispatch()
    const { orderHistory } = useSelector(store => store.orderHistory)


    useEffect(() => {
        dispatch(getOrderHistoryByUser())
    }, [dispatch])

    return (
        <div className="px:5 lg:px-20 bg-[#111827] pb-20">
            <Grid container sx={{justifyContent: "space-between"}}>
                <Grid item xs={2.5}>
                    <div className="h-auto shadow-xl p-5 sticky mt-10 text-white border border-gray-600">
                        <h1 className="font-bold text-center text-4xl">Filter</h1>
                        <div className="space-y-4 mt-10">
                            <h1 className="font-semibold text-2xl">ORDER STATUS</h1>
                            {orderStatus.map((option, index) => 
                                <div key={index} className="flex items-center pt-5">
                                    <input 
                                        defaultValue={option.value} 
                                        type="checkbox" 
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label className="ml-3 text-xl" htmlFor={option.value}>
                                        {option.lable}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </Grid>

                <Grid item xs={9}>
                    <div className="space-y-5">
                        {orderHistory?.map((item) => <OrderCard order={item} key={item.id}/>)}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Order