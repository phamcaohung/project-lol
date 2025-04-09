import React from "react";
import { Grid } from '@mui/material'
import { useNavigate } from "react-router-dom";

const ProductCategory = ({ data }) => {

    const navigate = useNavigate()

    const handleCategory = (product) => {
        switch (product?.category.name) {
            case "skin":
                return (
                    <>
                        <Grid container spacing={2} className='pt-5'>
                            <Grid item xs={4}>
                                <h3 className='text-lg lg:text-xl text-gray-300'>
                                    Tier :
                                </h3>
                            </Grid>
                            <Grid item xs={8} className='flex items-center'>
                                {product?.skin?.imageTier !== "" &&
                                    <img
                                        className='w-[1.5rem] h-[1.5rem]'
                                        src={product?.skin?.imageTier}
                                        alt=""
                                    />
                                }
                                <h3 
                                    className={`font-bold tracking-[2px] text-lg lg:text-xl cursor-pointer underline hover:text-red-400 text-gray-100 ${product?.skin?.imageTier !== "" && 'ml-5'}`}
                                    onClick={() => navigate(`/category/skin?skinTier=${product?.skin?.tier}`)}
                                >
                                    {product?.skin?.tier}
                                </h3>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className='pt-5'>
                            <Grid item xs={4}>
                                <h3 className='text-lg lg:text-xl text-gray-300'>
                                    Series :
                                </h3>
                            </Grid>
                            <Grid item xs={8} className='flex items-center'>
                                <h3 
                                    className='font-bold tracking-[2px] text-lg lg:text-xl text-gray-100 cursor-pointer underline hover:text-red-400'
                                    onClick={() => navigate(`/category/skin?series=${product?.skin?.series}`)}
                                >
                                    {product?.skin?.series}
                                </h3>
                            </Grid>
                        </Grid>
                    </>
                )
            case "champion":
                return (
                    <>
                        <Grid container spacing={2} className='pt-5'>
                            <Grid item xs={4}>
                                <h3 className='text-lg lg:text-xl text-gray-300'>
                                    Role :
                                </h3>
                            </Grid>
                            <Grid item xs={8} className='flex items-center'>
                                <img 
                                    className="w-10"
                                    src={product?.champion.imageRole}
                                    alt="" 
                                />
                                <h3 
                                    className='font-bold text-lg lg:text-xl text-gray-100 pl-2 cursor-pointer underline hover:text-red-400'
                                    onClick={() => navigate(`/category/champion?role=${product?.champion?.role}`)}
                                >
                                    {product?.champion?.role}
                                </h3>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className='pt-5'>
                            <Grid item xs={4}>
                                <h3 className='text-lg lg:text-xl text-gray-300'>
                                    Region :
                                </h3>
                            </Grid>
                            <Grid item xs={8} className='flex items-center'>
                                <img 
                                    className="w-10"
                                    src={product?.champion.imageRegion}
                                    alt="" 
                                />
                                <h3 
                                    className='font-bold text-lg lg:text-xl text-gray-100 pl-2 cursor-pointer underline hover:text-red-400'
                                    onClick={() => navigate(`/category/champion?region=${product?.champion?.region}`)}
                                >
                                    {product?.champion?.region}
                                </h3>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className='pt-5'>
                            <Grid item xs={4}>
                                <h3 className='text-lg lg:text-xl text-gray-300'>
                                    Difficulty :
                                </h3>
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
                                <h3 className={`font-bold text-lg lg:text-xl text-gray-100 ml-5`}>
                                    ( {product?.champion?.difficulty} )
                                </h3>
                            </Grid>
                        </Grid>
                    </>
                )
            case "chibi":
                return (
                    <>
                        <Grid container spacing={2} className='pt-5'>
                            <Grid item xs={4}>
                                <h3 className='text-lg lg:text-xl text-gray-300'>
                                    Tier :
                                </h3>
                            </Grid>
                            <Grid item xs={8} className='flex items-center'>
                                {product?.chibi.imageTier !== "" &&
                                    <img
                                        className='w-[1.5rem] h-[1.5rem]'
                                        src={product?.chibi?.imageTier}
                                        alt=""
                                    />
                                }
                                <h3 
                                    className={`font-bold text-lg lg:text-xl text-gray-100 cursor-pointer underline hover:text-red-400 ${product?.imageTier !== "" && 'ml-5'}`}
                                    onClick={() => navigate(`/category/chibi?chibiTier=${product?.chibi?.tier}`)}
                                >
                                    {product?.chibi?.tier}
                                </h3>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className='pt-5'>
                            <Grid item xs={4}>
                                <h3 className='text-lg lg:text-xl text-gray-300'>
                                    Champion :
                                </h3>
                            </Grid>
                            <Grid item xs={8} className='flex items-center'>
                                <h3 
                                    className='font-bold text-lg lg:text-xl text-gray-100 cursor-pointer underline hover:text-red-400'
                                    onClick={() => navigate(`/category/chibi?champion=${product?.chibi?.champion}`)}
                                >
                                    {product?.chibi?.champion}
                                </h3>
                            </Grid>
                        </Grid>
                    </>
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