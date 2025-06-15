import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderByPublicId } from "../../state/order/Action";
import { getPayment } from "../../state/payment/Action";
import { Button } from "@mui/material";
import ImagePaymentSuccess from "../../assets/payment_success.jpg"
import { CustomStepper } from "../../refactor/CustomStyle";

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState()
    const [payerId, setPayerId] = useState()
    const [token, setToken] = useState()
    const { orderId } = useParams()
    const dispatch = useDispatch()
    const { order } = useSelector(store => store.order)
    const navigate = useNavigate()
    const steps = ['Login', 'Delevery Address', 'Order Summary', 'Payment', 'Delivered'];


    useEffect(() => {
        const urlParam = new URLSearchParams(window.location.search)

        setPaymentId(urlParam.get("paymentId"))
        setPayerId(urlParam.get("PayerID"))
        setToken(urlParam.get("token"))
    }, [])

    useEffect(() => {
        if (paymentId) {
            const data = {
                orderId,
                paymentId,
                payerId,
                token
            }

            dispatch(getOrderByPublicId(orderId))

            if (order?.paymentDetails.status === "PENDING")
                dispatch(getPayment(data))
        }
    }, [orderId, paymentId, dispatch])


    return (
        <div className="px-24 py-10 bg-[#111827]">
            <div className="pt-10">
                <CustomStepper
                    active={4}
                    steps={steps}
                />
            </div>

            <div className="pt-10 flex justify-center">
                <img
                    className="w-[800px] h-[400px]"
                    src={ImagePaymentSuccess}
                    alt=""
                />
            </div>

            <div className="text-center text-white pt-5">
                <h1 className="text-4xl font-bold">
                    Your Payment Is Successfull
                </h1>
                <h4 className="text-xl font-semibold pt-5">
                    Thank you for your payment. An automated payment receipt will be sent to your
                    registered email.
                </h4>

                <div className="pt-10">
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
                        onClick={() => navigate(`/home`)}
                    >
                        Back To Home
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess