import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import Cart from "../components/cart/Cart";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import Product from "../components/product/Product";
import ProductDetail from "../components/productDetail/ProductDetail";
import Checkout from "../components/checkout/Checkout";
import Order from "../components/order/Order";
import PaymentSuccess from "../components/payment/PaymentSuccess";
import SigninAndSignup from "../auth/SigninAndSignup";


const CustomerRouter = () => {

    const location = useLocation()
    const jwt = localStorage.getItem("jwt")
    console.log("jwt router: ", jwt);
    if (jwt === null)
        location.pathname = '/loginOrRegister'

    return (
        <div>
            {jwt === null ? (
                <Routes>
                    <Route path="/loginOrRegister" element={<SigninAndSignup />}></Route>
                </Routes>
            ) : (
                <>
                    <div>
                        <Navigation />
                    </div>
                    <Routes>
                        <Route path="/login" element={<HomePage />}></Route>
                        <Route path="/register" element={<HomePage />}></Route>
                        <Route path="/home" element={<HomePage />}></Route>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/cart" element={<Cart />}></Route>
                        <Route path="/category/:category" element={<Product />}></Route>
                        <Route path="/product/:productId" element={<ProductDetail />}></Route>
                        <Route path="/checkout" element={<Checkout />}></Route>
                        <Route path="/order/:orderId/:step" element={<Checkout />}></Route>
                        <Route path="/account/orders" element={<Order />}></Route>
                        <Route path="/account/favorite" element={<Order />}></Route>
                        <Route path="/account/information" element={<Order />}></Route>
                        <Route path="/account/password" element={<Order />}></Route>
                        <Route path="/payment/:orderId" element={<PaymentSuccess />}></Route>
                    </Routes>
                    <div className="bg-[#EDF1FF]">
                        <Footer />
                    </div>
                </>
            )}
        </div>

    )
}

export default CustomerRouter