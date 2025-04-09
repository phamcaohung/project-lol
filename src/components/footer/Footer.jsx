import React from "react";
import { Grid } from "@mui/material";
import { YouTube, Twitter, Facebook, Instagram, Reddit } from '@mui/icons-material';

const Footer = () => {

    const title = ["ABOUT SKIN", "ABOUT CHAMPION", "ABOUT CHIBI", "HELP US IMPROVE", "SUPPORT", "CART STATUS"]
    const name = ["PRIVACY NOTICE", "TERMS OF SERVICE", "COOKIE PREFERENCES"]
    const text = ["Blood", "Fantasy Violence", "Mild Suggestive Themes", "Use of Alcohol and Tobacco", "Online Interactions Not Rated by the ESRB"]
    const icons = [
        { id: 1, Icon: YouTube },
        { id: 2, Icon: Twitter },
        { id: 3, Icon: Facebook },
        { id: 4, Icon: Instagram },
        { id: 5, Icon: Reddit },
    ]

    return (
        <div className="">
            <div className="h-20 flex bg-[#292929]">
                <Grid container className="mx-20">
                    {title.map((item, index) =>
                        <Grid key={index} item xs={12} sm={2} className="flex justify-center">
                            <div className="my-auto px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-500">
                                <h2 className="text-white text-xl font-semibold tracking-[2px]">
                                    {item}
                                </h2>
                            </div>
                        </Grid>
                    )}
                </Grid>
            </div>

            <div className="bg-[#111111]">
                <div className="flex justify-center pt-10">
                    {icons.map(({ id, Icon }) => (
                        <span key={id} className="bg-[#292929] my-auto p-2 rounded-xl mr-5 last:mr-0">
                            <Icon className='text-white' sx={{ fontSize: "40px" }} />
                        </span>
                    ))}
                </div>

                <div className="flex justify-center pt-10">
                    <p className="text-gray-400 text-center">
                        2025 Riot Games, Inc. League of Legends and all related logos, characters, classNames
                        and distinctive <br />
                        likenesses thereof are exclusive property of Riot Games, Inc. All Rights Reserved
                    </p>
                </div>

                <div className="pt-10">
                    <div className="flex justify-center">
                        {name.map((item, index) => (
                            <div key={index} className="my-auto px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-500">
                                <h2 className="text-white text-lg font-semibold tracking-[2px]">
                                    {item}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-10 pb-20 flex justify-center">
                    <div className="flex justify-center bg-[#1A1A1A] px-8 py-7">
                        <img
                            className="pr-5 w-28"
                            src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/riotbar/7e684cc4765a7d059f9018e16717472d7082dc37-65x97.png?"
                            alt=""
                        />
                        <span>
                            {text.map((item, index) => (
                                <span key={index}>
                                    <h2 className="text-white font-semibold text-lg tracking-[1px]">
                                        {item}
                                    </h2>
                                </span>
                            ))}
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer 