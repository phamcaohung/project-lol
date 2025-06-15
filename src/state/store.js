import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/Reducer";
import { carouselProductSeriesReducer, deleteProductReducer, getAllSeriesSkinReducer, getNewProductReducer, productListReducer, productReducer, productSeriesReducer } from "./product/Reducer";
import { getCartReducer, deleteCartReducer } from "./cart/Reducer";
import { createOrderReducer, deleteAddressReducer, GetAddressByIdReducer, getAddressReducer, getOrderHistoryReducer, orderReducer } from "./order/Reducer";
import { OrderStatusDeleteReducer, adminOrderReducer, changeOrderStatusReducer } from "./admin/order/Reducer";
import { updateCartItem } from "./cart/Action";
import { createUserAddressReducer } from "./user/Reducer";

//sb-ixzhe29386147@personal.example.com

const rootReducers = combineReducers({
    auth: authReducer,
    products: productListReducer,
    product: productReducer,
    deletedProduct: deleteProductReducer,
    cart: getCartReducer,
    updateCartItem: updateCartItem,
    deleteCartItem: deleteCartReducer,
    order: orderReducer,
    createOrder: createOrderReducer,
    orderHistory: getOrderHistoryReducer,
    adminOrder: adminOrderReducer,
    deleted: OrderStatusDeleteReducer,
    status: changeOrderStatusReducer,
    productSeries: productSeriesReducer,
    productCarousel: carouselProductSeriesReducer,
    listAddress: getAddressReducer,
    deletedAddress: deleteAddressReducer,
    series: getAllSeriesSkinReducer,
    newProducts: getNewProductReducer,
    address: GetAddressByIdReducer,
    response: createUserAddressReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))

