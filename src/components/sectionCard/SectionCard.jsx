import React from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

const SectionCard = ({ product }) => {

    const navigate = useNavigate()

    return (
        <div 
            className="cursor-pointer flex flex-col items-center bg-[#111827] rounded-lg shadow-lg overflow-hidden 
            w-[17rem] h-[28rem] mx-3 border px-5 py-10 mt-5"
            onClick={() => navigate(`/product/${product.id}`, { state: product.series })}
        >
            <div className="h-[13rem] w-[10rem]">
                <img
                    className="object-cover w-full h-full " 
                    src={product.imageUrl} 
                    alt="" 
                />
            </div>

            {product.imageTier !== "" && 
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
                        {product.price} 
                    </h1>
                    <img 
                        className='w-[1rem] h-[1rem] ml-2 mt-0.5'
                        src="https://rankedkings.com/img/rp.png"
                        alt="" 
                    />
                </div>
                <h1 className="font-bold text-lg text-gray-100 flex justify-center mt-3">
                    {moment(product.releaseDate).format("MMMM DD, YYYY")}
                </h1>
            </div>
        </div>
    )
}

export default SectionCard