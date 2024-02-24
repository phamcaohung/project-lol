import React from "react";
import MainCarousel from "../carousel/MainCarousel";
import SectionCarousel from "../sectionCarousel/SectionCarousel";


const HomePage = () => {
    return (
        <div className="bg-[#111827]">
            <MainCarousel />

            <div className="space-y-10 pb-20 flex flex-col justify-center px-5 lg:px-10">
                <SectionCarousel sectionName={"PROJECT"} />
                <SectionCarousel sectionName={"Coven"} />
                <SectionCarousel sectionName={"Immortal Journey"} />
                <SectionCarousel sectionName={"Pulsefire"} />
            </div>
        </div>
    )
}

export default HomePage