import React from "react";

const OrderCardItem = ({ item }) => {
    return (
        <div className="h-full bg-white/10 text-white/70 font-semibold text-center text-lg p-5 mr-5">
            <div className="flex justify-center py-5 border border-[#111827] hover:bg-[#111827]">
                <img 
                    className="w-[10rem] h-[10rem] object-cover"
                    src={item.imageColor}
                    alt="" 
                />
            </div>  

            <div className="flex justify-center -mt-5">
                <img 
                    src={item.product.imageTier}
                    alt="" 
                />
            </div>
                                
            <p className="mt-2">{item.product.title}</p>
            <p className="mt-2">Color: {item.color}</p>
            <p className="mt-2">Quantity: {item.quantity}</p>

            <div className="flex justify-center mt-2">
                <p>Price: {item.price} </p>
                <img 
                    className='w-[1.5rem] h-[1.5rem] ml-2 mt-0.5'
                    src="https://rankedkings.com/img/rp.png"
                    alt="" 
                />
            </div>
        </div>
    )
}

export default OrderCardItem