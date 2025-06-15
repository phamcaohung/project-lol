import { Box, Button, Checkbox, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressCard from "../addressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, deleteAddress, getAddressById, getAddressByUser } from "../../state/order/Action";
import { useNavigate } from "react-router-dom";
import { CustomTextField } from "../../refactor/CustomStyle";
import Address from "../addressCard/Address";

const DeliveryAddressForm = () => {
    const [addressData, setAddressData] = useState({
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        mobile: "",
        note: "",
        save: false
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { listAddress } = useSelector(store => store.listAddress)
    const { address } = useSelector(store => store.address)
    const { deletedAddress } = useSelector(store => store.deletedAddress)

    const handleSubmit = (e) => {
        e.preventDefault()

        const orderData = {
            addressData,
            navigate
        }
        console.log("orderData: ", orderData.addressData);

        dispatch(createOrder(orderData))
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

    const handleEditAddress = (address) => {
        const editAddress = {
            id: address.id
        }
        dispatch(getAddressById(editAddress))
    }

    const handleRemoveAddress = (addressId) => {
        dispatch(deleteAddress(addressId))
    }

    useEffect(() => {
        dispatch(getAddressByUser())
    }, [dispatch, deletedAddress, address])

    useEffect(() => {
        setAddressData((prevData) => ({
            ...prevData,
            firstName: address?.firstName,
            lastName: address?.lastName,
            streetAddress: address?.streetAddress,
            city: address?.city,
            state: address?.state,
            zipCode: address?.zipCode,
            mobile: address?.mobile
        }))
    }, [dispatch, address?.id])
    
    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={6} className="border border-gray-500 rounded-e-md shadow-md h-[33rem] overflow-y-scroll px-10">
                    {listAddress?.map((item, index) =>
                        <div key={index}>
                            <h1 className="text-3xl font-bold text-white mb-5">Address</h1>
                            <AddressCard
                                address={item}
                                handleEditAddress={handleEditAddress}
                                handleRemoveAddress={handleRemoveAddress}
                            />
                        </div>
                    )}
                </Grid>

                <Grid item xs={6}>
                    <Box className="border border-gray-500 rounded-s-md shadow-md p-5">
                        {/* <Address 
                        
                        /> */}
                        <div className="text-center mb-5">
                            <h2 className="text-2xl text-white font-semibold">Address Order Information</h2>
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

                                <Grid item xs={12} className="flex justify-center">
                                    <Button
                                        sx={{
                                            px: "1.5rem",
                                            py: "0.5rem",
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
                                        Deliver Here
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default DeliveryAddressForm