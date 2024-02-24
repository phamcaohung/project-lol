import React, { useEffect } from "react";
import SectionCard from "../sectionCard/SectionCard";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useDispatch, useSelector } from "react-redux";
import { findCarouselProductsBySeries } from "../../state/product/Action";

const SectionCarousel = ({ sectionName }) => {
    const { productCarousel } = useSelector(store => store.productCarousel)
    const dispatch = useDispatch()
    const skinCarousel = productCarousel[sectionName] || []

    useEffect(() => {
        dispatch(findCarouselProductsBySeries(sectionName))
    }, [dispatch, sectionName])

    return (
        <div className="border pb-5">
            <h2 className="text-3xl font-extrabold text-gray-300 text-center mt-5 -mb-2">
                {sectionName}
            </h2>
            <div className="relative p-5">
                <Slider
                    infinite
                    speed={500}
                    slidesToShow={6}
                    slidesToScrol={1}
                    nextArrow={
                        <KeyboardDoubleArrowRightIcon
                            sx={{
                                color: "white",
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                right: "-1rem",
                                "&:hover": {
                                    color: "white"
                                }
                            }}
                        />}
                    prevArrow={
                        <KeyboardDoubleArrowLeftIcon
                            sx={{
                                color: "white",
                                position: "absolute",
                                top: "50%",
                                transform: "translateY(-50%)",
                                left: "-1rem",
                                "&:hover": {
                                    color: "white"
                                }
                            }}
                        />}
                >
                    {skinCarousel.map((item) => <SectionCard product={item} key={item.id} />)}
                </Slider>
            </div>
        </div>
    )
}

export default SectionCarousel