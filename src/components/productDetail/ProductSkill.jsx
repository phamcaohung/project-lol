import React, { useState } from "react";
import { Grid } from '@mui/material'



const ProductSkill = ({ skill }) => {
    const [active, setActive] = useState(0)


    const handleText = (number) => {
        setActive(number)
    }

    return (
        <div className="mt-7">
            <Grid container spacing={5}>
                {skill.sort((a, b) => a.number - b.number).map((item) => (
                    <Grid item key={item.number}>
                        <img
                            className="w-[100px]"
                            src={item.image}
                            alt=""
                            onClick={() => handleText(item.number)}
                        />
                    </Grid>
                ))}
            </Grid>
            {skill.map((item) => (
                <div key={item.number}>
                    {active === item.number &&
                        <div>
                            <h1 className="text-lg font-bold mt-5 mb-4">
                                {item.name}
                            </h1>
                            <p className="text-gray-300">
                                {item.description}
                            </p>
                        </div>
                    }
                </div>
            ))}
        </div>
    );
}

export default ProductSkill