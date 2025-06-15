import { api } from "../../config/apiConfig"
import { CREATE_USER_ADDRESS_FAILURE, CREATE_USER_ADDRESS_REQUEST, CREATE_USER_ADDRESS_SUCCESS, EDIT_USER_ADDRESS_FAILURE, EDIT_USER_ADDRESS_REQUEST, EDIT_USER_ADDRESS_SUCCESS, RESET_RESPONSE } from "./ActionType"


export const createUserAddress = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_USER_ADDRESS_REQUEST })

    try {
        const { data } = await api.post(`api/users/address`, reqData)
        dispatch({ type: CREATE_USER_ADDRESS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CREATE_USER_ADDRESS_FAILURE, payload: error.message })
    }
}

export const updateUserAddress = (reqData) => async (dispatch) => {
    dispatch({ type: EDIT_USER_ADDRESS_REQUEST })

    try {
        const { data } = await api.put(`api/users/address/${reqData.id}`, reqData)
        
        dispatch({ type: EDIT_USER_ADDRESS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: EDIT_USER_ADDRESS_FAILURE, payload: error.message })
    }
}

export const resetResponse = () => async (dispatch) => {
    dispatch({ type: RESET_RESPONSE })
}