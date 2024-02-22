import React from "react";
import "./ProductCard.css"
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material"


const ProductCard = ({ product, loading }) => {
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/product/${product.id}`, { state: product.series })}
            className="productCard h-[28rem] transition-all cursor-pointer border-4 border-black rounded-lg"
        >
            <div className="h-[18rem]">
                {!loading
                    ? <img
                        className="h-full w-full object-cover"
                        src={product.color.find((item) => item.name === "Default").image}
                        alt=""
                    />

                    : <Skeleton variant="rectangular" height={280} />
                }
            </div>

            {product.imageTier !== "" &&
                <div className="flex justify-center">
                    <img
                        style={{
                            marginTop: "-25px",
                        }}
                        className="h-10 w-10"
                        src={product.imageTier}
                        alt=""
                    />
                </div>
            }


            <div className="textPart p-3">
                <p className="font-bold text-xl text-center">
                    {product.title}
                </p>


                {product.discountPercent === 0 ? (
                    <>
                        <div className="flex justify-center mt-3">
                            <p className="font-bold text-xl">
                                {product.price}
                            </p>
                            <img
                                className='w-[1.5rem] h-[1.5rem] ml-2 mt-1'
                                src="https://rankedkings.com/img/rp.png"
                                alt=""
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center mt-3">
                            <p className="font-bold text-xl line-through opacity-50 mr-1">
                                {product.price}
                            </p>
                            <p className="font-bold text-xl flex items-center mr-1">
                                ({product.discountedPrice}
                                <img
                                    className='w-[1.5rem] h-[1.5rem] ml-1 mt-1'
                                    src="https://rankedkings.com/img/rp.png"
                                    alt=""
                                />
                                )
                            </p>
                            <p className="font-bold text-green-600 text-xl">
                                ({product.discountPercent}% Off)
                            </p>
                        </div>
                    </>
                )}

                <div className="flex items-center justify-center mt-3">
                    {product.color.map((item, index) => (
                        item.name !== "Default" && (
                            <div
                                key={index}
                                style={{ backgroundColor: `${item.color}` }}
                                className="w-6 h-6 rounded-xl border-2 border-gray-800 mr-2 
                                    hover:object-cover"
                            >
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductCard