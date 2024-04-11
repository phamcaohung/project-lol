import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const ProductSeries = ({ product }) => {

    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };



    return (
        <div 
            className="cursor-pointer flex flex-col items-center bg-[#111827] rounded-lg shadow-lg overflow-hidden 
                        w-[18rem] h-[29rem] mx-3 border py-10 mt-10"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate(`/product/${product.id}`, { state: product.series} )}
        >
            <div className="w-full h-full">
                <img
                    
                    className={isHovered 
                        ?   'h-[13.5rem] w-full object-cover object-center'
                        :   'h-full w-full'
                    }
                    alt=""
                    src={isHovered 
                        ?   product.color.find((item) => item.name === "Default").image
                        :   product.imageUrl 
                    }
                />
            </div>

            {product.imageTier !== "" || !product.imageTier && 
                <div className="flex justify-center">
                    <img
                        style={{
                            marginTop: "-18px",
                        }}
                        className="h-8 w-8" 
                        src={product.imageTier}
                        alt="" 
                    />
                </div>
            }


            <div className="mt-3">
                <div className="flex justify-center h-[5rem] items-center">
                    <p className="font-bold text-lg text-gray-100 break-words text-center">
                        {product.title}
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <h1 className='font-bold text-lg lg:text-xl text-gray-100'>
                        {product?.price} 
                    </h1>
                    <img 
                        className='w-[1rem] h-[1rem] ml-2 mt-0.5'
                        src="https://rankedkings.com/img/rp.png"
                        alt="" 
                    />
                </div>
                <h1 className="font-bold text-lg text-gray-100 flex justify-center mt-3">
                    {moment(product?.releaseDate).format("MMMM DD, YYYY")}
                </h1>
            </div>
        </div>
    )
}

export default ProductSeries