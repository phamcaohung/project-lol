import React from "react";
import MainCarousel from "../carousel/MainCarousel";
import SectionCarousel from "../sectionCarousel/SectionCarousel";
import { project } from "../../data/Project";
import { spirit_blossom } from "../../data/Spirit_Blossom";
import { immortal_Journey } from "../../data/Immortal_Journey";
import { pulsefire } from "../../data/Pulsefire";
import { nightbringer_Dawnbringer } from "../../data/Nightbringer_Dawnbringer";
import { coven } from "../../data/Coven";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import { findCarouselProductsBySeries } from "../../state/product/Action";


const HomePage = () => {

    const dispatch = useDispatch()
    const { productCarousel } = useSelector(store => store.productCarousel)
    console.log("productCarousel: ", productCarousel);
    const name = "Nightbringer and Dawnbringer"

    useEffect(() => {
        const data = { 
            series: name
        }
        dispatch(findCarouselProductsBySeries(data))
    }, [name])

    return (
        <div>
            <MainCarousel/>

            <div className="space-y-10 pb-20 flex flex-col justify-center px-5 lg:px-10">
                <SectionCarousel data = {productCarousel} sectionName={"Carousel"}/>
                <SectionCarousel data = {project} sectionName={"Project"}/>
                <SectionCarousel data = {spirit_blossom} sectionName={"Spirit Blossom"}/>
                <SectionCarousel data = {immortal_Journey } sectionName={"Immortal Journey"}/>
                <SectionCarousel data = {pulsefire} sectionName={"Pulsefire"}/>
                <SectionCarousel data = {nightbringer_Dawnbringer} sectionName={"Nightbringer and Dawnbringer"}/>
                <SectionCarousel data = {coven} sectionName={"Coven"}/>
            </div>
        </div>
    )
}

export default HomePage