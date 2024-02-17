import { Button, Grid, IconButton, Paper, Typography, ButtonBase  } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../state/cart/Action";

const CartItem = ({ item }) => {
    const dispatch = useDispatch()

    const handleUpdateCartItem = (num) => {
        const data = { 
            data: { quantity: item.quantity + num }, 
            cartItemId: item.id
        }
        dispatch(updateCartItem(data))
    }

    const handleRemoveCartItem = (cartItemId) => {
        dispatch(removeCartItem(cartItemId))
    }

    return (
        <Paper className="m-auto p-5 flex-grow-1 border rounded-md shadow mt-5">
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Typography className="flex justify-center">
                        <ButtonBase sx={{ height: 200, }}>
                            <img 
                                className="w-auto h-auto"
                                src={item.product.imageUrl}
                                alt="" 
                            />
                        </ButtonBase>
                    </Typography>
                </Grid>
                
                <Grid item xs={4}>
                    <p className="font-semibold"> {item.product.title} </p>
                    <p className="opacity-70 mt-5">Tier: {item.product.tier} </p>
                    <p className="opacity-70 mt-5">Series: {item.product.series} </p>

                    <div className='flex space-x-5 items-center text-gray-900 pt-6'>
                        {item.product.discountPercent === 0 ? (
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
                                    {item.price} 
                                    <img 
                                        className='w-[1.5rem] h-[1.5rem] ml-2'
                                        src="https://rankedkings.com/img/rp.png"
                                        alt="" 
                                    />
                                </p>

                                <p className='opacity-50 line-through flex items-center'>
                                    {item.discountedPrice} 
                                    <img 
                                        className='w-[1.5rem] h-[1.5rem] ml-2'
                                        src="https://rankedkings.com/img/rp.png"
                                        alt="" 
                                    />
                                </p>

                                <p className='text-green-600 font-semibold'> {item.product.discountPercent}% Off</p>
                            </>
                        )}
                    </div>

                    <div className="text-center pt-3">
                        <Button 
                            onClick={() => handleRemoveCartItem(item.id)} 
                            variant="contained"
                            color="error"
                        >
                            remove
                        </Button>
                    </div>
                </Grid>

                <Grid item xs={2} className="grid grid-cols-2 gap-4 content-center">
                    <div className="flex items-center">
                        <IconButton 
                            onClick={ () => handleUpdateCartItem(-1)} 
                            disabled={ item.quantity <= 1 }
                        >
                            <RemoveCircleOutlineIcon/>
                        </IconButton>

                        <span className="py-1 px-7 border rounded-sm">
                            {item.quantity}
                        </span>

                        <IconButton 
                            sx={{color: "RGB(145 85 253)"}}
                            onClick={ () => handleUpdateCartItem(1)} 
                        >
                            <AddCircleOutlineIcon/>
                        </IconButton>
                        
                    </div>
                </Grid>
                

                <Grid item xs={3}>
                    <div className="text-center">
                         <p className="font-semibold">Color: {item.color}</p>
                         <ButtonBase sx={{ width: 150, height: 150 }}>
                            <img 
                                className="w-full h-auto object-cover mt-4"
                                src={item.imageColor}
                                alt="" 
                            />
                        </ButtonBase> 
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CartItem