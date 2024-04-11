import React, { useEffect, useState } from "react";
import MainCarousel from "../carousel/MainCarousel";
import { Button, Grid } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import TtyIcon from '@mui/icons-material/Tty';
import PageProduct from "./PageProduct";
import { useDispatch, useSelector } from "react-redux";
import { findCarouselProductsBySeries } from "../../state/product/Action";
import { useNavigate } from "react-router-dom";
import PageNewProduct from "./PageNewProduct";


const HomePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { productCarousel } = useSelector(store => store.productCarousel)
    const [series, setSeries] = useState("PROJECT")


    const handleChangeName = (name) => {
        setSeries(name)
        console.log("series: ", series);
    }


    useEffect(() => {
        dispatch(findCarouselProductsBySeries(series))
    }, [dispatch, series])


    const iconStyle = {
        fontSize: 70,
        color: "#F87171"
    }

    return (
        <div className="bg-[#111827] pb-20">
            <MainCarousel
                data={productCarousel[series] || []}
                onChangeName={handleChangeName}
            />

            <div className="mx-20">
                <Grid container spacing={10} className="text-white flex items-center">
                    <Grid item xs={3}>
                        <div className="flex items-center justify-center border border-slate-400 py-5">
                            <CheckIcon sx={iconStyle} />
                            <h1 className="text-3xl ml-5">Quality Product</h1>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div className="flex items-center justify-center border border-slate-400 py-5">
                            <LocalShippingIcon sx={iconStyle} />
                            <h1 className="text-3xl ml-5">Free Shipping</h1>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div className="flex items-center justify-center border border-slate-400 py-5">
                            <CurrencyExchangeIcon sx={iconStyle} />
                            <h1 className="text-3xl ml-5">14-Day Return</h1>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div className="flex items-center justify-center border border-slate-400 py-5">
                            <TtyIcon sx={iconStyle} />
                            <h1 className="text-3xl ml-5">24/7 Support</h1>
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div className="mx-20">
                <Grid
                    container
                    spacing={5}
                    marginTop={5}
                >
                    <Grid item xs={4}>
                        <PageProduct name={"PROJECT"} />
                    </Grid>

                    <Grid item xs={4}>
                        <PageProduct name={"Coven"} />
                    </Grid>

                    <Grid item xs={4}>
                        <PageProduct name={"Immortal Journey"} />
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={5}
                    marginTop={5}
                >
                    <Grid item xs={4}>
                        <PageProduct name={"Pulsefire"} />
                    </Grid>

                    <Grid item xs={4}>
                        <PageProduct name={"High Noon"} />
                    </Grid>

                    <Grid item xs={4}>
                        <PageProduct name={"Porcelain"} />
                    </Grid>
                </Grid>
            </div>

            <div className="mx-20">
                <Grid
                    container
                    marginTop={5}
                    spacing={5}
                >
                    <Grid item xs={6} >
                        <div className="flex justify-between bg-white/10 p-10">
                            <img
                                src="https://static.wikia.nocookie.net/leagueoflegends/images/5/5a/Chibi_Kai%27Sa_Lagoon_Dragon_Tier_1.png"
                                alt=""
                            />

                            <div>
                                <h3 className="text-red-400 text-2xl flex justify-end">
                                    20% OFF THE ALL ORDER
                                </h3>
                                <h2 className="text-5xl text-white font-bold my-7">
                                    Teamfight Tactics
                                </h2>
                                <div className="flex justify-end">
                                    <Button
                                        size="large"
                                        sx={{
                                            p: "1rem 2rem",
                                            color: "#F87171",
                                            border: "1px solid #F87171",
                                            ":hover": {
                                                color: "white",
                                                backgroundColor: "black",
                                                border: "black"
                                            }
                                        }}
                                        onClick={() => navigate("/category/littleLegend")}
                                    >
                                        Shop Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={6} >
                        <div className="flex justify-between bg-white/10 p-10">
                            <div>
                                <h3 className="text-red-400 text-2xl">
                                    20% OFF THE ALL ORDER
                                </h3>
                                <h2 className="text-5xl text-white font-bold my-7">
                                    Teamfight Tactics
                                </h2>
                                <div>
                                    <Button
                                        size="large"
                                        sx={{
                                            p: "1rem 2rem",
                                            color: "#F87171",
                                            border: "1px solid #F87171",
                                            ":hover": {
                                                color: "white",
                                                backgroundColor: "black",
                                                border: "black"
                                            }
                                        }}
                                        onClick={() => navigate("/category/littleLegend")}
                                    >
                                        Shop Now
                                    </Button>
                                </div>
                            </div>

                            <img
                                src="https://static.wikia.nocookie.net/leagueoflegends/images/3/3a/Chibi_Gwen_Soul_Fighter_Tier_1.png"
                                alt=""
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>

            <PageNewProduct category={"skin"} />

            <PageNewProduct category={"champion"} />
        </div>
    )
}

export default HomePage