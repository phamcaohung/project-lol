import React, { useState } from "react";
import { Grid } from '@mui/material'



const ProductSkill = ({ skill }) => {
    const [active, setActive] = useState(skill[0].keyboard)


    const handleText = (key) => {
        setActive(key)
    }

    return (
        <div className="mt-7">
            <Grid container spacing={5}>
                {skill.sort((a, b) => a.id - b.id).map((item) => (
                    <Grid item key={item.keyboard}>
                        <img
                            className={`${item.keyboard === active ? '' : 'opacity-60'} w-[100px]`}
                            src={item.image}
                            alt=""
                            onClick={() => handleText(item.keyboard)}
                        />
                    </Grid>
                ))}
            </Grid>
            {skill.map((item) => (
                <div key={item.keyboard}>
                    {active === item.keyboard &&
                        <div>
                            <h1 className="text-2xl font-bold mt-5 mb-4">
                                {item.name}
                            </h1>
                            <p className="text-gray-300 text-xl">
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