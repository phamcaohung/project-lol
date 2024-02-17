import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import AddressCard from "../addressCard/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, deleteAddress, getAddressByUser } from "../../state/order/Action";
import { useNavigate } from "react-router-dom";

const DeliveryAddressForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { address } = useSelector(store => store.address)
    const { deletedAddress } = useSelector(store => store.deletedAddress)

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)

        const address = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            streetAddress: data.get("address"),
            city: data.get("city"),
            state: data.get("state"),
            zipCode: data.get("zip"),
            mobile: data.get("phoneNumber")
        }
        const orderData = {
            address,
            navigate
        }
        
        dispatch(createOrder(orderData))
    }

    const handleDeliver = (item) => {
        const address = item;

        const orderData = {
            address,
            navigate
        }

        dispatch(createOrder(orderData))
    }

    const handleRemoveDeliver = (addressId) => {
        dispatch(deleteAddress(addressId))
    }

    useEffect(() => {
        dispatch(getAddressByUser())
    }, [deletedAddress])

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={6} className="border rounded-e-md shadow-md h-[33rem] overflow-y-scroll">
                    {address?.map((item, index) => 
                        <div key={index} className={`border-b cursor-pointer ${index !== 0 && 'mt-7'}`}>
                            <AddressCard address={item}/>
                            <div className="flex justify-center mb-5">
                                <Button
                                    sx={{
                                        bgcolor: "RGB(145 85 253)",
                                        marginRight: "50px" 
                                    }}
                                    size="large"
                                    variant="contained"
                                    onClick={() => handleDeliver(item)}
                                >
                                    Deliver Here
                                </Button>
                                <Button
                                    color="error"
                                    size="large"
                                    variant="contained"
                                    onClick={() => handleRemoveDeliver(item.id)}
                                >
                                    Remove Deliver
                                </Button>
                            </div>
                        </div>
                    )}
                </Grid>

                <Grid item xs={6} >
                    <Box className="border rounded-s-md shadow-md p-5">
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="address"
                                        name="address"
                                        label="Address"
                                        fullWidth
                                        autoComplete="given-name"
                                        multiline
                                        rows={4}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="city"
                                        name="city"
                                        label="City"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="state"
                                        name="state"
                                        label="State/Province/Region"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="zip"
                                        name="zip"
                                        label="Zip / Postal code"
                                        fullWidth
                                        autoComplete="shipping postal-code"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="Phone Number"
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>

                                <Grid item xs={12} className="flex justify-center">
                                    <Button
                                        sx={{
                                            py: 1.5,
                                            mt: 2,
                                            bgcolor: "RGB(145 85 253)"
                                        }}
                                        size="large"
                                        variant="contained"
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