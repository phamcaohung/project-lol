import React, { useState } from "react";
import { Grid } from '@mui/material'



const ProductSkill = ({ skill }) => {
    const [active, setActive] = useState(1)
    const firstSkill = skill.find((item) => item.number === 0)
    const filterSkill = skill.filter(item => item.number > 0)
    console.log("skill: ", skill);
    console.log("filterSkill: ", filterSkill);

    const handleText = (number) => {
        setActive(number)
    }

    return (
        <div className="mt-7">
            <img
                className="w-[100px]"
                src={firstSkill.image}
                alt=""
            />
            <h1 className="text-lg font-bold mt-5 mb-4">
                {firstSkill.name}
            </h1>
            <p className="text-gray-300">
                {firstSkill.description}
            </p>
            <Grid container spacing={1} marginTop={3}>
                {filterSkill.map((item) => (
                    <Grid item key={item.number}>
                        <img
                            className="w-[100px]"
                            src={item.image}
                            alt=""
                            onClick={() => handleText(item.number)}
                        />
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
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ProductSkill