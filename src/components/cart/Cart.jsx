import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCard } from "../../state/cart/Action";

const Cart = () => {
    const navitage = useNavigate()
    const dispatch = useDispatch()
    const { cart } = useSelector(store => store.cart)
    const { deleteCartItem } = useSelector(store => store.deleteCartItem)

    const handleCheckout = () => {
        navitage("/checkout?step=2")
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getCard())
    }, [dispatch, cart?.cartItems.quantity, deleteCartItem, cart?.totalItem])

    useEffect(() => {
        if (deleteCartItem)
            dispatch(getCard())
    }, [dispatch, deleteCartItem])

    return (
        <div className="bg-[#111827] text-white px-20 py-10">
            <Grid container spacing={6}>
                <Grid item xs={12} sm={8}>
                    {cart?.cartItems.map((item, index) =>
                        <CartItem item={item} key={index} deleteCartItem={deleteCartItem} />
                    )}
                </Grid>

                <Grid item xs={12} sm={4}>
                    <p className="uppercase font-bold pb-4 text-2xl">Price detail</p>
                    <hr />
                    <div className="space-y-3 font-semibold mb-10 text-xl">
                        <div className="flex justify-between pt-3">
                            <span>Price</span>
                            <span className="flex items-center">
                                {cart?.totalPrice}
                                <img
                                    className='w-[1.5rem] h-[1.5rem] ml-2'
                                    src="https://rankedkings.com/img/rp.png"
                                    alt=""
                                />
                            </span>
                        </div>

                        <div className="flex justify-between pt-3">
                            <span>Disccount</span>
                            <span className="text-red-600 flex items-center">
                                {cart?.discounted}
                                <img
                                    className='w-[1.5rem] h-[1.5rem] ml-2'
                                    src="https://rankedkings.com/img/rp.png"
                                    alt=""
                                />
                            </span>
                        </div>

                        <div className="flex justify-between pt-3">
                            <span>Delivery Charge</span>
                            <span className="text-red-600">Free</span>
                        </div>

                        <div className="flex justify-between pt-3">
                            <span>Total Item</span>
                            <span className="text-red-600">
                                {cart?.totalItem}
                            </span>
                        </div>

                        <div className="flex justify-between pt-3 font-bold">
                            <span>Total Amount  </span>
                            <span className="text-red-600 flex items-center">
                                {cart?.discounted === 0 ? cart?.totalPrice : cart?.totalDiscountedPrice}
                                <img
                                    className='w-[1.5rem] h-[1.5rem] ml-2'
                                    src="https://rankedkings.com/img/rp.png"
                                    alt=""
                                />
                            </span>
                        </div>
                    </div>
                    <Button
                        onClick={handleCheckout}
                        className="w-full mt-5"
                        color='error'
                        variant='contained'
                        sx={{
                            px: "1.5rem",
                            py: "1rem",
                            bgcolor: "#2DCCFF",
                            borderRadius: "30px",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: '1rem',
                            ":hover": {
                                bgcolor: "#56F000",
                            },
                        }}
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cart