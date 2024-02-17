import { api } from "../../../config/apiConfig"
import { CHANGE_ORDER_STATUS_FAILURE, CHANGE_ORDER_STATUS_REQUEST, CHANGE_ORDER_STATUS_SUCCESS, DELETE_ORDERS_FAILURE, DELETE_ORDERS_REQUEST, DELETE_ORDERS_SUCCESS, GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS } from "./ActionType"


export const getOrders = () => async (dispatch) => {
    dispatch({ type: GET_ALL_ORDERS_REQUEST })

    try {
        const { data } = await api.get(`api/admin/orders/`)
        dispatch({ 
            type: GET_ALL_ORDERS_SUCCESS, 
            payload: data 
        })
    } catch (error) {
        dispatch({ type: GET_ALL_ORDERS_FAILURE, payload: error.message })
    }
}

export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDERS_REQUEST })

    try {
        const { data } = await api.delete(`api/admin/orders/${orderId}/delete`)
        dispatch({ type: DELETE_ORDERS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: DELETE_ORDERS_FAILURE, payload: error.message })
    }
}

export const ChangeStatusOrder = (orderId, status) => async (dispatch) => {
    dispatch({ type: CHANGE_ORDER_STATUS_REQUEST })

    try {
        const { data } = await api.put(`api/admin/orders/${orderId}/status?status=${status}`)
        dispatch({ type: CHANGE_ORDER_STATUS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: CHANGE_ORDER_STATUS_FAILURE, payload: error.message })
    }
}