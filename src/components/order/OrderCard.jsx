import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import OrderCardItem from "./OrderCardItem";
import { CustomChip } from "../../refactor/CustomStyle";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const OrderCard = ({ order }) => {

    const navigate = useNavigate()
    const [show, setShow] = useState(true)

    return (
        <div className="border border-gray-600 rounded-xl">
            <div className="p-10 bg-gray-800">
                <div className="flex justify-between">
                    <div className="flex items-center pb-5">
                        <h3 className="text-xl text-white/70 font-semibold">Order #:</h3>
                        <h3 className="text-2xl pl-5">
                            {order?.id}
                        </h3>
                    </div>
                    <div className="mb-5 cursor-pointer" onClick={() => setShow(!show)}>
                        {show ? (
                            <ExpandMoreIcon
                                sx={{
                                    color: "#56F000",
                                    fontSize: "70px",
                                }}
                            />
                        ) : (
                            <ExpandLessIcon
                                sx={{
                                    color: "#56F000",
                                    fontSize: "70px",
                                }}
                            />
                        )}
                    </div>

                </div>

                <Grid container>
                    <Grid item xs={2}>
                        <h3 className="text-xl text-white/70 font-semibold">Order Date</h3>
                        <h3 className="text-2xl mt-2">
                            {moment(order?.orderDate).format("MMMM DD, YYYY")}
                        </h3>
                    </Grid>
                    <Grid item xs={2}>
                        <h3 className="text-xl text-white/70 font-semibold">Status</h3>
                        <CustomChip label={order?.orderStatus} className="mt-2" />
                    </Grid>
                    <Grid item xs={2}>
                        <h3 className="text-xl text-white/70 font-semibold">Total Price</h3>
                        <h3 className="text-2xl mt-2 flex items-center">
                            {order?.totalPrice}
                            <img
                                className="w-[1.5rem] h-[1.5rem] ml-2 mt-1"
                                src="https://rankedkings.com/img/rp.png"
                                alt=""
                            />
                        </h3>
                    </Grid>
                    <Grid item xs={2}>
                        <h3 className="text-xl text-white/70 font-semibold">Total Item</h3>
                        <h3 className="text-2xl mt-2 flex items-center">
                            {order?.totalItem}
                        </h3>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="flex justify-between">
                            <Button
                                sx={{
                                    px: "2.5rem",
                                    py: "0.5rem",
                                    bgcolor: "#2DCCFF",
                                    color: "black",
                                    fontWeight: "bold",
                                    fontSize: '1rem',
                                    borderRadius: "40px",
                                    ":hover": {
                                        bgcolor: "#56F000",
                                    }
                                }}
                            >
                                Order Again
                            </Button>

                            <Button
                                sx={{
                                    px: "2.5rem",
                                    py: "0.5rem",
                                    border: '1px solid gray',
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: '1rem',
                                    borderRadius: "40px",
                                    ":hover": {
                                        bgcolor: "#56F000",
                                        color: "black",
                                        fontWeight: "bold",
                                    },
                                }}
                                onClick={() => navigate(`/order/${order?.id}/4`)}
                            >
                                View Order
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>

            {order?.orderItem?.map((item) => <OrderCardItem item={item} key={item.id} show={show} />)}
        </div>
    )
}

export default OrderCard