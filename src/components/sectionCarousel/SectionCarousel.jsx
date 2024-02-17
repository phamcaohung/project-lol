import React from "react";
import SectionCard from "../sectionCard/SectionCard";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


const SectionCarousel = ({ data, sectionName }) => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: 
            <KeyboardDoubleArrowRightIcon 
                sx={{ 
                    color: "black",
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    right: "-1rem",
                    "&:hover": {
                        color: "black"
                    }
                }} 
            />,
        prevArrow: 
            <KeyboardDoubleArrowLeftIcon 
                sx={{ 
                    color: "black",
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: "-1rem",
                    "&:hover": {
                        color: "black"
                    }
                }} 
            />
    };


    return (
        <div className="border pb-5">
            <h2 className="text-3xl font-extrabold text-pray-800 text-center mt-5 -mb-2">
                {sectionName}
            </h2>
            <div className="relative p-5">
                <Slider
                    {...settings}
                >
                    {data.map((item, index) => <SectionCard product = {item} key={index}/> )}
                </Slider>
            </div>
        </div>
    )
}

export default SectionCarousel