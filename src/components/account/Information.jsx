import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomTextField } from "../../refactor/CustomStyle";
import { useDispatch, useSelector } from "react-redux";
import { formatNumberPhone } from "../../refactor/utils";
import ModalNewAddress from "./ModalNewAddress";


const Information = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: ""
    })
    const [address, setAddress] = useState({
        id: "",
        firstName: "",
        lastName: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        mobile: "",
    })
    const [openModal, setOpenModal] = useState(false)
    const [edit, setEdit] = useState(false)
    const { auth } = useSelector(store => store)
    const dispatch = useDispatch()
    const [responseStatus, setResponseStatus] = useState(null);



    const getAddress = (item) => {
        setAddress((prevData) => ({
            ...prevData,
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            streetAddress: item.streetAddress,
            city: item.city,
            state: item.state,
            zipCode: item.zipCode,
            mobile: item.mobile,
        }))
        setOpenModal(true)
        setEdit(true)
    }

    useEffect(() => {
        setUser((prevData) => ({
            ...prevData,
            firstName: auth?.user?.firstName,
            lastName: auth?.user?.lastName,
            email: auth?.user?.email,
            mobile: auth?.user?.mobile
        }))
        setResponseStatus(null)
    }, [dispatch, auth?.user, responseStatus])

    return (
        <div className="px-14 py-5">
            <h1 className="text-4xl font-bold pb-20">Your Account Details</h1>
            <h3 className="text-2xl font-bold">Personal Details</h3>

            <Grid container className="py-12" spacing={5}>
                <Grid item xs={2} className="flex">
                    <div className="my-auto">
                        <h3 className="text-xl text-white/70 font-semibold">First Name</h3>
                    </div>
                </Grid>
                <Grid item xs={7}>
                    <CustomTextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={user.firstName}
                    />
                </Grid>
                <Grid item xs={3} className="flex">
                    <div className="my-auto">
                        <Button
                            sx={{
                                px: "2.5rem",
                                py: "0.5rem",
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
                            Edit
                        </Button>
                    </div>
                </Grid>

                <Grid item xs={2} className="flex">
                    <div className="my-auto">
                        <h3 className="text-xl text-white/70 font-semibold">Last Name</h3>
                    </div>
                </Grid>
                <Grid item xs={7}>
                    <CustomTextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={user.lastName}
                    />
                </Grid>
                <Grid item xs={3} className="flex">
                    <div className="my-auto">
                        <Button
                            sx={{
                                px: "2.5rem",
                                py: "0.5rem",
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
                            Edit
                        </Button>
                    </div>
                </Grid>

                <Grid item xs={2} className="flex">
                    <div className="my-auto">
                        <h3 className="text-xl text-white/70 font-semibold">Email</h3>
                    </div>
                </Grid>
                <Grid item xs={7}>
                    <CustomTextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={user.email}
                    />
                </Grid>
                <Grid item xs={3} className="flex">
                    <div className="my-auto">
                        <Button
                            sx={{
                                px: "2.5rem",
                                py: "0.5rem",
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
                            Edit
                        </Button>
                    </div>
                </Grid>

                <Grid item xs={2} className="flex">
                    <div className="my-auto">
                        <h3 className="text-xl text-white/70 font-semibold">Phone Number</h3>
                    </div>
                </Grid>
                <Grid item xs={7}>
                    <CustomTextField
                        fullWidth
                        label="Phone Number"
                        name="mobile"
                        value={user.mobile}
                    />
                </Grid>
                <Grid item xs={3} className="flex">
                    <div className="my-auto">
                        <Button
                            sx={{
                                px: "2.5rem",
                                py: "0.5rem",
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
                            Edit
                        </Button>
                    </div>
                </Grid>
            </Grid>

            <hr />

            <h2 className="text-3xl font-bold py-20">Shipping Addresses</h2>
            <Grid container className="pb-12" rowSpacing={5}>
                {auth?.user?.address.map((item) => (
                    <>
                        <Grid item xs={8}>
                            <h3 className="text-xl text-white/70 font-semibold">
                                {item.firstName} {item.lastName} <br />
                                {item.streetAddress}, {item.city}, {item.state} <br />
                                Mobile: {formatNumberPhone(item.mobile)} {" "} | Zip Code: {item.zipCode}
                            </h3>
                        </Grid>
                        <Grid item xs={2} className="flex">
                            <div className="my-auto">
                                <Button
                                    sx={{
                                        px: "2.5rem",
                                        py: "0.5rem",
                                        color: "#56F000",
                                        border: "1px solid gray",
                                        fontWeight: "bold",
                                        fontSize: '1rem',
                                        borderRadius: "40px",
                                        textTransform: "none",
                                        ":hover": {
                                            bgcolor: "#56F000",
                                            color: "black"
                                        }
                                    }}
                                    onClick={() => getAddress(item)}
                                >
                                    Edit
                                </Button>
                            </div>

                        </Grid>
                        <Grid item xs={2} className="flex">
                            <div className="my-auto">
                                <Button
                                    sx={{
                                        px: "2.5rem",
                                        py: "0.5rem",
                                        bgcolor: "#FF3838",
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
                                    Delete
                                </Button>
                            </div>
                        </Grid>
                    </>
                ))}
            </Grid>

            <Button
                sx={{
                    px: "2.5rem",
                    py: "1rem",
                    bgcolor: "#2DCCFF",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: '1.3rem',
                    borderRadius: "40px",
                    textTransform: "none",
                    marginRight: "30px",
                    marginBottom: "48px",
                    ":hover": {
                        bgcolor: "#56F000",
                    }
                }}
                onClick={() => {
                    setOpenModal(true)
                    setEdit(false)
                }}
            >
                Add New Address
            </Button>


            <ModalNewAddress
                openModal={openModal}
                setOpenModal={setOpenModal}
                address={address}
                edit={edit}
                setResponseStatus={setResponseStatus}
            />



            <hr />

            <h2 className="text-3xl font-bold py-20">Supporting Articles</h2>
            <h3 className="text-xl text-[#56F000] font-semibold pb-3">Why do I need account?</h3>
            <h3 className="text-xl text-[#56F000] font-semibold pb-3">How do I change my password?</h3>
            <h3 className="text-xl text-[#56F000] font-semibold pb-3">What if I forgot my password?</h3>
            <h3 className="text-xl text-[#56F000] font-semibold pb-3">How do I check my order status?</h3>
        </div>
    )
}

export default Information