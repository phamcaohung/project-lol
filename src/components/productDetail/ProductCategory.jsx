import React from "react";
import { Grid } from '@mui/material'

const ProductCategory = ({ data }) => {
    const handleCategory = (product) => {
        switch (product?.category.name) {
            case "skin":
                return (
                    <Grid container spacing={2} className='pt-5'>
                        <Grid item xs={4}>
                            <h1 className='text-lg lg:text-xl text-gray-300'>
                                Tier :
                            </h1>
                        </Grid>
                        <Grid item xs={8} className='flex items-center'>
                            {product?.skin.imageTier !== "" &&
                                <img
                                    className='w-[1.5rem] h-[1.5rem]'
                                    src={product?.skin.imageTier}
                                    alt=""
                                />
                            }
                            <h1 className={`font-bold text-lg lg:text-xl text-gray-100 ${product?.imageTier !== "" && 'ml-5'}`}>
                                {product?.skin.tier}
                            </h1>
                        </Grid>
                    </Grid>     
                )
            case "champion":
                return (
                    <div>
                        <Grid container spacing={2} className='pt-5'>
                            <Grid item xs={4}>
                                <h1 className='text-lg lg:text-xl text-gray-300'>
                                    Role :
                                </h1>
                            </Grid>
                            <Grid item xs={8} className='flex items-center'>
                                <h1 className={`font-bold text-lg lg:text-xl text-gray-100`}>
                                    {product?.champion?.role}
                                </h1>
                            </Grid>
                        </Grid>
            
                        <Grid container spacing={2} className='pt-5'>
                            <Grid item xs={4}>
                                <h1 className='text-lg lg:text-xl text-gray-300'>
                                    Difficulty :
                                </h1>
                            </Grid>
                            <Grid item xs={8} className='flex items-center'>
                                <span
                                    className='w-5 h-5 bg-[#08D7F7] mr-1'
                                    style={{ transform: 'skewX(-40deg)', }}
                                />
                                <span
                                    className={`${product?.champion?.difficulty !== 'LOW' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                    style={{ transform: 'skewX(-40deg)', }}
                                />
                                <span
                                    className={`${product?.champion?.difficulty === 'HIGH' ? '' : 'opacity-20'} w-5 h-5 bg-[#08D7F7] mr-1`}
                                    style={{ transform: 'skewX(-40deg)', }}
                                />
                                <h1 className={`font-bold text-lg lg:text-xl text-gray-100 ml-5`}>
                                    ( {product?.champion?.difficulty} )
                                </h1>
                            </Grid>
                        </Grid>
                    </div>
                )
            case "tittle":
                return (
                    <div></div>
                )
        }
    }

    return (
        <div>
            {handleCategory(data)}
        </div>
    )
}

export default ProductCategory