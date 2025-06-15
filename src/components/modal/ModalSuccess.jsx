import React, { useEffect } from "react";
import successImage from '../../assets/success.jpg'
import { Button, Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetResponse } from "../../state/user/Action";


const ModalSuccess = ({ title, open, close, setOpenModal, setResponseStatus }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (open === true) {
            if (setResponseStatus) setResponseStatus(true);
        }
    }, [dispatch, open]);
    return (
        <>
            <Modal
                open={open}
            >

                <div
                    className="
                      bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute
                        rounded-[70px] shadow-lg py-16 px-10 w-[500px] h-[650px]
                    "
                >
                    <div className="flex justify-center">
                        <img
                            src={successImage}
                            alt=""
                            className="w-[350px]"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-center py-5">Success</h1>
                    <h2 className="text-2xl text-center font-semibold text-gray-500">{title}</h2>
                    <div className="flex justify-center py-7">
                        <Button
                            onClick={() => {
                                close(false)
                                setOpenModal(false)
                                dispatch(resetResponse())
                            }}
                            sx={{
                                px: "4rem",
                                py: "0.7rem",
                                bgcolor: "#2DCCFF",
                                color: "black",
                                fontWeight: "bold",
                                fontSize: '1rem',
                                borderRadius: "40px",
                                textTransform: "none",
                                ":hover": {
                                    bgcolor: "#56F000",
                                }
                            }}
                        >
                            OK
                        </Button>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default ModalSuccess