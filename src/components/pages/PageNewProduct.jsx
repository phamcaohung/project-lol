import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findNewProducts } from "../../state/product/Action";

const PageNewProduct = ({ category }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { newProducts } = useSelector(store => store.newProducts)
    const data = newProducts[category] || []
    console.log("data: ", data);
    


    useEffect(() => {
        dispatch(findNewProducts(category))
    }, [dispatch, category])

    return (
        <div className="mx-20 mt-14">
            <div className="flex items-center justify-center">
                <hr className="w-[4rem]" />
                <h1 className="text-white text-5xl font-semibold mx-5">
                    {category ? `New Skin Product` : `New Champion Products`}
                </h1>
                <hr className="w-[4rem]" />
            </div>

            <Grid container spacing={3}>
                {data.map((item) =>
                    <Grid item xs={2} key={item.id}>
                        <div className="border border-slate-400 mt-16 text-center cursor-pointer">
                            <div className="flex justify-center">
                                <img
                                    className="hover:scale-90 transition duration-300 ease-in-out"
                                    src={item.color?.find((para) => para.name === "Default")?.image}
                                    alt=""
                                />
                            </div>
                            <h2 className="flex justify-center items-center text-xl text-red-400 font-semibold border-t border-slate-400 pt-5 h-24">
                                {item.title}
                            </h2>
                            <div className="flex items-center justify-center">
                                <h2 className="text-xl text-white">
                                    {item.price}
                                </h2>
                                <img
                                    className='w-[1.5rem] h-[1.5rem] ml-2 mt-0.5'
                                    src="https://rankedkings.com/img/rp.png"
                                    alt=""
                                />
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