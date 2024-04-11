// import { api } from "../../config/apiConfig"
// import { CREATE_PAYMENT_FAILURE, CREATE_PAYMENT_REQUEST, UPDATE_PAYMENT_FAILURE, UPDATE_PAYMENT_REQUEST } from "./ActionType"


// export const createPayment = (orderId) => async (dispatch) => {

//     dispatch({ type: CREATE_PAYMENT_REQUEST })

//     try {
//         const { data } = await api.post(`/api/payment/${orderId}`, {})

//         if(data.paymentLinkUrl) {
//             window.location.href = data.paymentLinkUrl;
//         }


//     } catch (error) {
//         dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message })
//     }
// }


// export const updatePayment = (reqData) => async (dispatch) => {

//     dispatch({ type: UPDATE_PAYMENT_REQUEST })

//     try {
//         const { data } = await api.get(`/api/payment?payment_id=${reqData.paymentId}&token=${reqData.token}&payer_id=${reqData.payerId}&order_id=${reqData.orderId}`)


//     } catch (error) {
//         dispatch({ type: UPDATE_PAYMENT_FAILURE, payload: error.message })
//     }
// }