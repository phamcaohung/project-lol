import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { West, LocalMall, Favorite, Person, LockOpen, ShoppingCart } from '@mui/icons-material';
import OrderHistory from "./OrderHistory";
import Information from "../account/Information";
import ChangePassword from "../account/ChangePassword";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Favorites from "../account/Favorites";


const Order = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const info = [
        { name: "Order History", Icon: LocalMall },
        { name: "Favorites", Icon: Favorite },
        { name: "Personal Information", Icon: Person },
        { name: "Change Password", Icon: LockOpen },
        { name: "Shopping Cart", Icon: ShoppingCart },
        { name: "Log Out", Icon: West },
    ]
    const getSelectedFromPath = (pathname) => {
        if (pathname.includes("/orders")) return "Order History";
        if (pathname.includes("/information")) return "Personal Information";
        if (pathname.includes("/password")) return "Change Password";
        if (pathname.includes("/favorite")) return "Favorites";
        if (pathname.includes("/cart")) return "Shopping Cart";
        return "Order History"; 
    };
    const [selected, setSelected] = useState(() => getSelectedFromPath(location.pathname));

    const handleChangeOption = (name) => {
        setSelected(name)
        switch (name) {
            case 'Order History':
                navigate(`/account/orders`)
                break
            case 'Favorites':
                navigate(`/account/favorite`)
                break
            case 'Personal Information':
                navigate(`/account/information`)
                break
            case 'Change Password':
                navigate(`/account/password`)
                break
            case 'Shopping Cart':
                navigate(`/cart`)
                break
            case 'Log Out':
                return (
                   <></>
                )
            default:
                break;
        }
    }

    const handlOption = (key) => {
        switch (key) {
            case 'Order History':
                return (
                    <OrderHistory />
                )
            case 'Favorites':
                return (
                   <Favorites />
                )
            case 'Personal Information':
                return (
                    <Information />
                )
            case 'Change Password':
                return (
                    <ChangePassword />
                )
            case 'Shopping Cart':
                return (
                    <></>
                )
            case 'Log Out':
                return (
                   <></>
                )
            default:
                break;
        }
    }

    useEffect(() => {
        if(location.pathname)
            setSelected(getSelectedFromPath(location.pathname))
    }, [dispatch, location.pathname])

    return (
        <div className="px-20 py-10 bg-[#111827] text-white">
            <Grid container spacing={5}>
                <Grid item xs={3}>
                    <div className="border border-gray-600 rounded-lg p-10">
                        <h2 className="text-3xl font-bold pb-10">Your Account</h2>
                        {info.map(({ name, Icon, index }) => (
                            <div
                                key={index}
                                className={`
                                    flex py-5 cursor-pointer transition-all -ml-11
                                    ${selected === name
                                        ? 'border-l-4 border-[#56F000] text-[#56F000]'
                                        : 'hover:bg-white/10'
                                    }
                                `}
                                onClick={() => handleChangeOption(name)}
                            >
                                <div className="pl-10 flex items-center">
                                    <Icon className={`mr-5 ${selected === name && "text-[#56F000]"}`} />
                                    <h3 className="text-xl font-semibold">{name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </Grid>

                <Grid item xs={9}>
                    {handlOption(selected)}
                </Grid>
            </Grid>
        </div>
    )
}

export default Order