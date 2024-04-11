import axios from "axios"
import { API_BASE_URL, api } from "../../config/apiConfig"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"

const registerRequest = () => ({ type: REGISTER_REQUEST })
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user })
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error })

export const register = (data) => async (dispatch) => {
    dispatch(registerRequest())

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, data.userData)
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt)
        }
        data.navigate('/')
        dispatch(registerSuccess(user.jwt))
    } catch (error) {
        dispatch(registerFailure(error.message))
    }
}


const loginRequest = () => ({ type: LOGIN_REQUEST })
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user })
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error })


export const login = (data) => async (dispatch) => {
    dispatch(loginRequest())

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, data.userData)
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt)
        }
        data.navigate('/')

        dispatch(loginSuccess(user.jwt))
    } catch (error) {
        dispatch(loginFailure(error.message))
    }
}


const getUserRequest = () => ({ type: GET_USER_REQUEST })
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user })
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error })


export const getUser = () => async (dispatch) => {
    dispatch(getUserRequest())

    try {
        const { data } = await api.get(`/api/users/profile`)
        console.log("data ", data);
        dispatch(getUserSuccess(data))
    } catch (error) {
        dispatch(getUserFailure(error.message))
    }
}

export const logout = (navigate) => (dispatch) => {
    dispatch({ type: LOGOUT, payload: null })
    localStorage.clear()
    navigate('/loginOrRegister')
    console.log("end");

} 