import React from "react";
import Address from "../addressCard/Address";
import { Modal } from "@mui/material";

const ModalNewAddress = ({ openModal, setOpenModal, address, edit, setResponseStatus }) => {
    return (
        <>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
            >

                <div
                    className="
                                bg-[#111827] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute
                                border-2 border-gray-600 shadow-lg py-16 px-10
                            "
                >
                    <Address
                        address={address}
                        edit={edit}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        setResponseStatus={setResponseStatus}
                    />
                </div>
            </Modal>
        </>
    )
}

export default ModalNewAddress