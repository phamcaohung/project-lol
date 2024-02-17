import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCard } from "../../state/cart/Action";

const Cart = () => {
    const navitage = useNavigate()
    const dispatch = useDispatch()
    const { cart } = useSelector(store => store.cart)
    const { deleteCartItem } = useSelector(store => store.deleteCartItem)

    console.log("cart: ", cart);
    console.log("deleteCartItem: ", deleteCartItem);

    const handleCheckout = () => {
        navitage("/checkout?step=2")
    }

    const compareByCreateAt = (a, b) => {
        return new Date(b.createAt) - new Date(a.createAt)
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(getCard())
    }, [cart?.cartItems.quantity, deleteCartItem, cart?.totalItem])

    return (
        <div>
            <div className="lg:grid grid-cols-3 lg:px-16 relative">
                <div className="col-span-2 overflow-auto">
                    {cart?.cartItems.sort(compareByCreateAt).map((item, index) => <CartItem item={item} key={index}/>)}
                </div>

                <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
                    <div className="border p-10">
                        <p className="uppercase font-bold opacity-60 pb-4">Price detail</p>
                        <hr/>
                        <div className="space-y-3 font-semibold mb-10">
                            <div className="flex justify-between pt-3 text-black">
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
                                <span className="text-green-600 flex items-center">
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
                                <span className="text-green-600">Free</span>
                            </div>

                            <div className="flex justify-between pt-3">
                                <span>Total Item</span>
                                <span className="text-green-600">
                                    {cart?.totalItem} 
                                </span>
                            </div>

                            <div className="flex justify-between pt-3 font-bold">
                                <span>Total Amount  </span>
                                <span className="text-green-600 flex items-center">
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
                            color='secondary'
                            variant='contained' 
                            sx={{
                                px: "2.5rem",
                                py: ".7rem",
                                bgcolor: "#9155fd"
                            }}
                            >
                                Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart