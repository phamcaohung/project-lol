import React from "react"
import AliceCarousel from "react-alice-carousel"
import 'react-alice-carousel/lib/alice-carousel.css'
import { mainCarouselData } from "./MainCarouselData"


const MainCarousel = () => {
    const items = mainCarouselData.map( (item) => 
        <div className="w-full" style={{height: "700px"}}>
            <img 
                className="cursor-pointer w-full h-full transform scale-100"
                role="presentation"
                src={item.image}
                alt=""
            />
        </div>   
    )

    return (
            <AliceCarousel
                items={items}
                disableButtonsControls
                autoPlay
                autoPlayInterval={1000}
                infinite
            />
    )
}

export default MainCarousel