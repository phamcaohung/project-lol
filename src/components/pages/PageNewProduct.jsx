import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findNewProducts } from "../../state/product/Action";
import moment from "moment/moment";

const PageNewProduct = ({ category }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { newProducts } = useSelector(store => store.newProducts)
    const data = newProducts[category] || []


    useEffect(() => {
        dispatch(findNewProducts(category))
    }, [dispatch, category])

    return (
        <div className="mx-20 mt-14">
            <div className="flex items-center justify-center">
                <hr className="w-[4rem]" />
                <h1 className="text-white text-5xl font-semibold mx-5">
                    New {category.charAt(0).toUpperCase() + category.slice(1)} Product
                </h1>
                <hr className="w-[4rem]" />
            </div>

            <Grid container spacing={3}>
                {data.map((item) =>
                    <Grid 
                        item 
                        xs={2} 
                        key={item.id}
                        onClick={() => navigate(`product/${item.id}`, { state: item.series })}
                    >
                        <div className="border border-slate-400 mt-16 text-center cursor-pointer">
                            <div className="flex justify-center">
                                <img
                                    className="hover:scale-90 transition duration-300 ease-in-out"
                                    src={item.imageColor}
                                    alt=""
                                />
                            </div>

                            <hr className="bg-slate-400 w-full"/>

                            <div className="h-24 flex justify-center">
                                <h2 className="text-xl text-red-400 font-semibold my-auto tracking-wider">
                                    {item.title}
                                </h2>
                            </div>
                            
                            <div className="flex justify-center">
                                <h2 className="text-xl text-white">
                                    {item.price}
                                </h2>
                                <img
                                    className='w-[1.5rem] h-[1.5rem] ml-2 mt-0.5'
                                    src="https://rankedkings.com/img/rp.png"
                                    alt=""
                                />
                            </div>

                            <div className="flex justify-center mt-3">
                                <h2 className="text-xl text-white">
                                    {moment(item.releaseDate).format("MMMM DD, YYYY")}
                                </h2>
                            </div>

                            <div className="border-t border-slate-400 flex justify-between py-5 px-2 mt-6">
                                <div onClick={() => navigate(`product/${item.id}`, { state: item.series })}>
                                    <VisibilityIcon className="text-red-400" />
                                    <span className="text-white hover:text-red-400 ml-1">View Detail</span>
                                </div>
                                <div>
                                    <ShoppingCartIcon className="text-red-400" />
                                    <span className="text-white hover:text-red-400 ml-1">Add To Cart</span>
                                </div>
                            </div>
                        </div>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default PageNewProduct