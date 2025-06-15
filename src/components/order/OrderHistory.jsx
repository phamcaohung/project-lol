import React, { useEffect } from "react";
import { FilterList } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { getOrderHistoryByUser } from "../../state/order/Action";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import OrderCard from "./OrderCard";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';


const OrderHistory = () => {
    const dispatch = useDispatch()
    const { orderHistory } = useSelector(store => store.orderHistory)
    const [value, setValue] = React.useState(dayjs());

    useEffect(() => {
        dispatch(getOrderHistoryByUser())
    }, [dispatch])

    return (
        <>
            <div className="px-14 py-5">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">Your Orders</h1>
                    <div className="flex items-center border border-gray-600 rounded-xl">
                        <span className="p-3 border-r-2 border-gray-600">
                            <FilterList fontSize="large" />
                        </span>

                        <div className="w-[200px]">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    sx={{
                                        "& label": { color: "white" },
                                        "& label.Mui-focused": { color: "white" },
                                        "& .MuiOutlinedInput-root": {
                                            "&:hover fieldset": { borderColor: "white" },
                                            "&.Mui-focused fieldset": { borderColor: "white" },
                                        },
                                        "& .MuiInputBase-root": {
                                            color: "white",
                                        },
                                        "& .MuiButtonBase-root": {
                                            color: "white"
                                        }
                                    }}
                                    views={['year', 'month']}
                                    minDate={dayjs('2000-01-01')}
                                    maxDate={dayjs('2100-12-31')}
                                    value={value}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
            </div>


            {orderHistory?.map((item) => <OrderCard order={item} key={item.id} />)}

            <div className="flex justify-center mt-10">
                <Pagination
                    color='error'
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: "white"
                        }
                    }}
                />
            </div>
        </>
    )
}

export default OrderHistory