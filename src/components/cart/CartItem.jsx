import { Button, Grid, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../state/cart/Action";

const CartItem = ({ item }) => {
    const dispatch = useDispatch()

    const handleUpdateCartItem = (num) => {
        const data = {
            quantity: item.quantity + num,
            cartItemId: item.id
        }
        dispatch(updateCartItem(data))
    }

    const handleRemoveCartItem = (cartItemId) => {
        dispatch(removeCartItem(cartItemId))
    }

    return (
        <div className="p-5 border rounded-md mt-5">
            <Grid container spacing={3}>
                <Grid item xs={3} className="flex">
                    <div className="my-auto">
                        <img
                            className="w-auto h-auto hover:scale-90 transition duration-300 ease-in-out"
                            src={item.imageUrl}
                            alt=""
                        />
                    </div>
                </Grid>

                <Grid item xs={4}>
                    <p className="font-bold text-xl">Name: {item.name} </p>

                    <div className='flex space-x-5 items-center pt-6'>
                        {item.discountPercent === 0 ? (
                            <p className='font semibold flex items-center'>
                                Price: {item.price}
                                <img
                                    className='w-[1.5rem] h-[1.5rem] ml-2'
                                    src="https://rankedkings.com/img/rp.png"
                                    alt=""
                                />
                            </p>
                        ) : (
                            <>
                                <p className='font semibold flex items-center'>
                                    Price: {item.price}
                                    <img
                                        className='w-[1.5rem] h-[1.5rem] ml-2'
                                        src="https://rankedkings.com/img/rp.png"
                                        alt=""
                                    />
                                </p>

                                <p className='opacity-50 line-through flex items-center'>
                                    Price Discount: {item.discountedPrice}
                                    <img
                                        className='w-[1.5rem] h-[1.5rem] ml-2'
                                        src="https://rankedkings.com/img/rp.png"
                                        alt=""
                                    />
                                </p>

                                <p className='text-red-600 font-semibold'> {item.discountPercent}% Off</p>
                            </>
                        )}
                    </div>

                    <div className="text-center pt-10">
                        <Button
                            onClick={() => handleRemoveCartItem(item.id)}
                            variant="contained"
                            color="error"
                        >
                            remove
                        </Button>
                    </div>
                </Grid>

                <Grid item xs={2}>
                    <p className="font-bold text-xl pr-5 text-center">Quantity</p>
                    <div className="flex items-center pt-10">
                        <IconButton
                            onClick={() => handleUpdateCartItem(-1)}
                            disabled={item.quantity <= 1}
                            sx={{
                                '&.Mui-disabled': {
                                    color: 'darkred'
                                }
                            }}
                            color="error"
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>

                        <span className="py-1 px-7 border rounded-sm">
                            {item.quantity}
                        </span>

                        <IconButton
                            color="error"
                            onClick={() => handleUpdateCartItem(1)}
                        >
                            <AddCircleOutlineIcon />
                        </IconButton>

                    </div>
                </Grid>


                <Grid item xs={3}>
                    <div className="text-center">
                        <p className="font-bold text-xl pb-5">Color Name: {item.nameColor}</p>
                        {item.color && 
                            <div className="flex justify-center">
                                <div
                                    style={{ backgroundColor: `${item.color}` }}
                                    className='w-6 h-6 rounded-xl border-2 border-gray-800'
                                />
                            </div>
                        }
                        <div className="flex justify-center ">
                            <img
                                className="w-[250px] h-[220px] pl-8"
                                src={item.imageColor}
                                alt=""
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default CartItem