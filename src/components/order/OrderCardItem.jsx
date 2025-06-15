import { Button, Grid } from "@mui/material";
import React from "react";
import { InvertColorsOff } from "@mui/icons-material"
import { Transition } from "@headlessui/react";


const OrderCardItem = ({ item, show }) => {
    return (
        <div>
            <Transition
                className="p-10 "
                show={show}
                enter="transition duration-500"
                enterFrom="scale-75 translate-x-full opacity-0"
                leave="duration-300 ease-in-out"
                leaveTo="scale-75"
                appear
            >
                <Grid container spacing={5} className="pb-20">
                    <Grid item xs={3}>
                        <img
                            className="rounded-xl"
                            src={item.imageUrl}
                            alt=""
                        />
                        <div className="flex justify-center pt-5">
                            <img
                                className="w-[150px] h-[150px] rounded-xl bg-white/10"
                                src={item.imageColor}
                                alt=""
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6} className="flex">
                        <div className="my-auto">
                            <h2 className="text-3xl font-bold pb-10">
                                {item.name} - {item.nameColor}
                            </h2>
                            <div className="flex items-center pb-5">
                                <h4 className="text-xl text-white/70 font-semibold">Price:</h4>
                                <h4 className="text-xl font-bold pl-5 flex items-center">
                                    {item.price}
                                    <img
                                        className="w-[1.5rem] h-[1.5rem] ml-2 mt-0.5"
                                        src="https://rankedkings.com/img/rp.png"
                                        alt=""
                                    />
                                </h4>
                            </div>
                            <div className="flex items-center pb-5">
                                <h4 className="text-xl text-white/70 font-semibold">Quantity:</h4>
                                <h4 className="text-xl font-bold pl-5">{item.quantity}</h4>
                            </div>
                            <div className="flex items-center pb-5">
                                <h4 className="text-xl text-white/70 font-semibold">Category:</h4>
                                <h4 className="text-xl font-bold pl-5">{item.category.name.toUpperCase()}</h4>
                            </div>
                            <div className="flex items-center pb-5">
                                <h4 className="text-xl text-white/70 font-semibold pr-5">Color:</h4>
                                {item.color ? (
                                    <div
                                        style={{ backgroundColor: `${item.color}` }}
                                        className='w-6 h-6 rounded-md border-2 border-gray-800 mt-1'
                                    />
                                ) : (
                                    <InvertColorsOff fontSize="medium" className='mt-1 text-[#A4ABB6]' />
                                )}
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={3} className="flex">
                        <div className="my-auto">
                            <div className="flex justify-center pb-14">
                                <h2 className="text-3xl font-bold text-[#56F000] mt-2 flex items-center">
                                    {item.quantity * item.price}
                                    <img
                                        className="w-[1.5rem] h-[1.5rem] ml-2 mt-1"
                                        src="https://rankedkings.com/img/rp.png"
                                        alt=""
                                    />
                                </h2>
                            </div>
                            <div className="text-center">
                                <Button
                                    sx={{
                                        px: "3.5rem",
                                        py: "0.5rem",
                                        border: '1px solid gray',
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: '1rem',
                                        borderRadius: "40px",
                                        ":hover": {
                                            bgcolor: "#56F000",
                                            color: "black",
                                            fontWeight: "bold",
                                        },
                                    }}
                                >
                                    Buy It Again
                                </Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <hr />
            </Transition>
        </div>
    )
}

export default OrderCardItem