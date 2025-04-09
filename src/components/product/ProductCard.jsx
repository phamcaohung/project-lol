import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import InvertColorsOffIcon from '@mui/icons-material/InvertColorsOff';


const ProductCard = ({ product }) => {
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="cursor-pointer flex flex-col items-center rounded-lg shadow-lg overflow-hidden 
                            w-[18rem] h-full mx-3 border pt-10 mt-10 hover:bg-white/10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(`/product/${product.id}`, { state: product.series })}
        >

            <img
                className='h-[13.5rem] w-full object-cover object-center'
                alt=""
                src={isHovered ? product.imageColor : product.imageUrl}
            />

            {product.imageTier &&
                <div className="flex justify-center">
                    <img
                        className="h-8 w-8 -mt-4"
                        src={product.imageTier}
                        alt=""
                    />
                </div>
            }


            <div className="mt-3">
                <div className="flex justify-center h-[5rem] items-center">
                    <p className="font-bold text-2xl text-gray-100 break-words text-center">
                        {product.title}
                    </p>
                </div>
                <div className="flex items-center justify-center mt-3">
                    <h1 className='font-bold text-xl lg:text-xl text-gray-100'>
                        {product?.price}
                    </h1>
                    <img
                        className='w-[1.5rem] h-[1.5rem] ml-2 mt-0.5'
                        src="https://rankedkings.com/img/rp.png"
                        alt=""
                    />
                </div>
                <div className="flex flex-wrap justify-center items-center mt-3 h-[5rem]">
                    {product?.colors.length === 0 ? (
                        <InvertColorsOffIcon color="error" fontSize="large"/>
                    ) : (
                        product?.colors.map((color) => (
                            <div
                                key={color}
                                style={{ backgroundColor: `${color}` }}
                                className='w-6 h-6 rounded-xl border-2 border-gray-800 m-2'
                            />
                        ))
                    )}
                </div>
                <h1 className="font-bold text-lg text-gray-100 flex justify-center">
                    Release: {moment(product?.releaseDate).format("MMMM DD, YYYY")}
                </h1>
            </div>
        </div>
    )
}

export default ProductCard