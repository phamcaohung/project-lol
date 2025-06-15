import { Grid } from "@mui/material";
import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { createOrder } from "../../state/order/Action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AddressCard = ({ address, handleRemoveAddress, handleEditAddress }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleAddAddress = (address) => {
        const orderData = {
            address,
            navigate
        }

        dispatch(createOrder(orderData))
    }

    return (
        <div className="text-white">
            <Grid container>
                <Grid item xs={12}>
                    <div
                        style={{
                            backgroundImage: "url('https://www.expatden.com/wp-content/uploads/2023/01/Map-of-Ho-Chi-Minh-City.jpg')"
                        }}
                        className="border border-gray-500 rounded-2xl px-10 pt-10 pb-5 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-700 to-white/70"></div>
                        <div className="relative">
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <PersonIcon fontSize="large" sx={{ color: "#8DDC26" }} />
                                    <h2 className="text-3xl pl-4 font-bold">{address.firstName} {address.lastName}</h2>
                                </div>

                                <div className="flex">
                                    <div 
                                        className="bg-[#111827] rounded-full p-3 mr-5 cursor-pointer"
                                        onClick={() => handleEditAddress(address)}
                                    >
                                        <EditIcon
                                            fontSize="large"
                                            sx={{
                                                color: "#2DCCFF"
                                            }}
                                            className="transition-transform transform hover:rotate-12"
                                        />
                                    </div>
                                    <div 
                                        className="bg-[#111827] rounded-full p-3 cursor-pointer"
                                        onClick={() => handleRemoveAddress(address.id)}
                                    >
                                        <DeleteIcon
                                            fontSize="large"
                                            sx={{
                                                color: "#FF3838"
                                            }}
                                            className="transition-transform transform hover:rotate-12"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center mt-4">
                                <PhoneIcon fontSize="large" sx={{ color: "#8DDC26" }} />
                                <h3 className="text-3xl pl-4">{address.mobile}</h3>
                            </div>
                            <div className="flex items-center mt-4">
                                <LocationOnIcon fontSize="large" sx={{ color: "#8DDC26" }} />
                                <h3 className="text-2xl pl-4 text-gray-400">{address.streetAddress}, {address.city}</h3>
                            </div>
                            <div className="flex items-center mt-4">
                                <PublicIcon fontSize="large" sx={{ color: "#8DDC26" }} />
                                <h3 className="text-2xl pl-4 text-gray-400">{address.state}</h3>
                            </div>
                            <h3 className="text-2xl text-gray-400 mt-4">
                                Zip Code: {address.zipCode}
                            </h3>
                            <div className="flex justify-end">
                                <div
                                    className="flex items-center bg-[#111827] rounded-full py-1.5 px-5 cursor-pointer"
                                    onClick={() => handleAddAddress(address)}
                                >
                                    <CheckIcon fontSize="large" sx={{ color: "#8DDC26" }} />
                                    <h3 className="text-xl font-bold pl-2 text-[#8DDC26]">Select Address</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddressCard