import React from "react";
import MainCarousel from "../carousel/MainCarousel";
import SectionCarouselProject from "../sectionCarousel/SectionCarouselProject";
import SectionCarouselCoven from "../sectionCarousel/SectionCarouselCoven";
import SectionCarouselImmortal from "../sectionCarousel/SectionCarouselImmortal";


const HomePage = () => {
    return (
        <div>
            <MainCarousel />

            <div className="space-y-10 pb-20 flex flex-col justify-center px-5 lg:px-10">
                <SectionCarouselProject sectionName={"PROJECT"} />
                <SectionCarouselCoven sectionName={"Coven"} />
                <SectionCarouselImmortal sectionName={"Immortal Journey"}/>
            </div>
        </div>
    )
}

export default HomePage