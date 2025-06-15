import { Button, Checkbox, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomTextField } from "../../refactor/CustomStyle";
import { useDispatch, useSelector } from "react-redux";
import { createUserAddress, updateUserAddress } from "../../state/user/Action";
import ModalSuccess from "../modal/ModalSuccess";


const Address = ({ address, edit, openModal, setOpenModal, setResponseStatus }) => {
    const dispatch = useDispatch()
    const { response } = useSelector(store => store.response)
    const [ openModalSuccess, setOpenModalSuccess ] = useState(false)

    const [addressData, setAddressData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        mobile: "",
        note: "",
        save: openModal ? true : false
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        edit ? dispatch(updateUserAddress(addressData)) : dispatch(createUserAddress(addressData))
    }

    const handleChangeData = (e) => {
        const { name, value } = e.target
        setAddressData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleCheckBox = (e) => {
        const { name, checked } = e.target
        setAddressData((prevData) => ({
            ...prevData,
            [name]: checked
        }))
    }

    useEffect(() => {
        if (edit)
            setAddressData((prevData) => ({
                ...prevData,
                id: address.id,
                firstName: address?.firstName,
                lastName: address?.lastName,
                streetAddress: address?.streetAddress,
                city: address?.city,
                state: address?.state,
                zipCode: address?.zipCode,
                mobile: address?.mobile
            }))
    }, [dispatch, address?.id])

    useEffect(() => {
        if(response?.status && response?.status === true) {
            setOpenModalSuccess(true)
        }
    }, [dispatch, response])

    return (
        <>
            <div className="text-center mb-5">
                <h2 className="text-3xl text-white font-semibold">Address Order Information</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required
                            name="firstName"
                            label="First Name"
                            value={addressData.firstName}
                            onChange={handleChangeData}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required
                            name="lastName"
                            label="Last Name"
                            value={addressData.lastName}
                            onChange={handleChangeData}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CustomTextField
                            required
                            name="streetAddress"
                            label="Address"
                            value={addressData.streetAddress}
                            onChange={handleChangeData}
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required
                            name="city"
                            label="City"
                            value={addressData.city}
                            onChange={handleChangeData}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required
                            name="state"
                            label="State/Province/Region"
                            value={addressData.state}
                            onChange={handleChangeData}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required
                            name="zipCode"
                            label="Zip / Postal code"
                            value={addressData.zipCode}
                            onChange={handleChangeData}
                            type="number"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <CustomTextField
                            required
                            name="mobile"
                            label="Phone Number"
                            value={addressData.mobile}
                            onChange={handleChangeData}
                            type="number"
                            fullWidth
                        />
                    </Grid>

                    {!openModal &&
                        <>
                            <Grid item xs={12}>
                                <CustomTextField
                                    name="note"
                                    label="Note"
                                    value={addressData.note}
                                    onChange={handleChangeData}
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            </Grid>

                            <Grid item xs={12} className="flex justify-center items-center">
                                <Checkbox
                                    sx={{
                                        color: "white",
                                        "&.Mui-checked": {
                                            color: "#2DCCFF",
                                        }
                                    }}
                                    size="large"
                                    name="save"
                                    onChange={handleCheckBox}
                                />

                                <p className="text-white text-lg">Do you want save this address ?</p>
                            </Grid>
                        </>
                    }


                    <Grid item xs={12} className="flex justify-center">
                        <Button
                            sx={{
                                px: "2rem",
                                py: "0.8rem",
                                bgcolor: "#2DCCFF",
                                borderRadius: "30px",
                                color: "black",
                                fontWeight: "bold",
                                fontSize: '1rem',
                                ":hover": {
                                    bgcolor: "#56F000",
                                },
                            }}
                            size="large"
                            type="submit"
                        >
                            {!openModal ? 'Deliver Here' : 'Submit'}
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {openModalSuccess && 
                <ModalSuccess
                    title={response?.message}
                    open={openModalSuccess}
                    close={setOpenModalSuccess}
                    setOpenModal={setOpenModal}
                    setResponseStatus={setResponseStatus}
                />
            }
        </>
    )
}

export default Address