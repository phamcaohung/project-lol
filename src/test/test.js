import React from "react";
import { Grid } from '@mui/material'



const ProductSkill = () => {
    const skill = [
        {
            "name": "ACHOOO!",
            "image": "https://static.wikia.nocookie.net/leagueoflegends/images/1/18/Smolder_Achooo%21.png",        },
        {
            "name": "DRAGON PRACTICE",
            "image": "https://static.wikia.nocookie.net/leagueoflegends/images/e/ea/Smolder_Dragon_Practice.png",
        },
    ]

    return (
        <div className="mt-7">
            <Grid container spacing={1} marginTop={3}>
                {skill.map((item, index) => (
                    <Grid item key={index}>
                        <img
                            className="w-[100px]"
                            src={item.image}
                            alt=""
                        />
                        {
                             <h1 className="text-lg font-bold mt-5 mb-4">
                                {item.name}
                            </h1>
                        }
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ProductSkill