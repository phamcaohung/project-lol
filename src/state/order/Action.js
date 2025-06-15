import { api } from "../../config/apiConfig"
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ADDRESS_BY_ID_FAILURE, DELETE_ADDRESS_BY_ID_REQUEST, DELETE_ADDRESS_BY_ID_SUCCESS, GET_ADDRESS_BY_ID_FAILURE, GET_ADDRESS_BY_ID_REQUEST, GET_ADDRESS_BY_ID_SUCCESS, GET_ADDRESS_BY_USER_FAILURE, GET_ADDRESS_BY_USER_REQUEST, GET_ADDRESS_BY_USER_SUCCESS, GET_ORDER_BY_PUBLIC_ID_FAILURE, GET_ORDER_BY_PUBLIC_ID_REQUEST, GET_ORDER_BY_PUBLIC_ID_SUCCESS, GET_ORDER_HISTORY_FAILURE, GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS } from "./ActionType"

export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST })

    try {
        const { data } = await api.post(`api/orders/`, reqData.addressData)
        console.log("data order: ", data);
        if(data.id) 
            reqData.navigate(`/checkout?step=3&order_id=${data.id}`)
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message })
    }
}


export const getOrderByPublicId = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_PUBLIC_ID_REQUEST })

    try {
        const { data } = await api.get(`api/orders/${orderId}`)

        dispatch({ type: GET_ORDER_BY_PUBLIC_ID_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_ORDER_BY_PUBLIC_ID_FAILURE, payload: error.message })
    }
}

export const getOrderHistoryByUser = () => async (dispatch) => {
    dispatch({ type: GET_ORDER_HISTORY_REQUEST })

    try {
        const { data } = await api.get(`api/orders/history`)

        dispatch({ type: GET_ORDER_HISTORY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_ORDER_HISTORY_FAILURE, payload: error.message })
    }
}

export const getAddressById = (reqData) => async (dispatch) => {
    dispatch({ type: GET_ADDRESS_BY_ID_REQUEST})

    try {
        const { data } = await api.get(`api/orders/address/${reqData.id}`)

        dispatch({
            type: GET_ADDRESS_BY_ID_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ 
            type: GET_ADDRESS_BY_ID_FAILURE,
            payload: error.message
        })
    }
}

export const deleteAddress = (addressId) => async (dispatch) => {
    dispatch({ type: DELETE_ADDRESS_BY_ID_REQUEST})

    try {
        await api.delete(`/api/orders/address/${addressId}`)

        dispatch({
            type: DELETE_ADDRESS_BY_ID_SUCCESS,
            payload: addressId
        })
    } catch (error) {
        dispatch({ 
            type: DELETE_ADDRESS_BY_ID_FAILURE,
            payload: error.message
        })
    }
}

export const getAddressByUser = () => async (dispatch) => {
    dispatch({ type: GET_ADDRESS_BY_USER_REQUEST})

    try {
        const { data } = await api.get(`api/orders/address`)

        dispatch({
            type: GET_ADDRESS_BY_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ 
            type: GET_ADDRESS_BY_USER_FAILURE,
            payload: error.message
        })
    }
}
