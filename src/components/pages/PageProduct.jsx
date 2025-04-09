import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findCarouselProductsBySeries } from "../../state/product/Action";
import { Link, useNavigate } from "react-router-dom";

const PageProduct = ({ name }) => {
    const disptach = useDispatch()
    const navigate = useNavigate()
    const { productCarousel } = useSelector(store => store.productCarousel)
    const productSeries = productCarousel[name] || []
    const random = Math.floor(Math.random(0, productSeries.length) * 11)
    const productRandom = productSeries[random]


    useEffect(() => {
        disptach(findCarouselProductsBySeries(name))
    }, [disptach, name])

    return (
        <div className="text-white">
            <div className="border border-slate-400 px-10 py-8">
                <p className="text-lg flex justify-end">
                    {productSeries.length} Products
                </p>
                <img
                    className="my-8 hover:scale-110 transition duration-300 ease-in-out cursor-pointer"
                    src={productRandom?.imageUrl}
                    alt=""
                    onClick={() => navigate(`/product/${productRandom.id}`, { state: productRandom.series })}
                />
                <Link
                    className="text-2xl font-bold hover:underline hover:text-red-400"
                    to={`/category/skin?series=${name}`}
                >
                    {name} Skin
                </Link>
            </div>
        </div>
    )
}

export default PageProduct