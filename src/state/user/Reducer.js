import { CREATE_USER_ADDRESS_FAILURE, CREATE_USER_ADDRESS_REQUEST, CREATE_USER_ADDRESS_SUCCESS, EDIT_USER_ADDRESS_FAILURE, EDIT_USER_ADDRESS_REQUEST, EDIT_USER_ADDRESS_SUCCESS, RESET_RESPONSE } from "./ActionType";

const initialState = {
    response: null,
    error: null,
    loading: false,
}

export const createUserAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER_ADDRESS_REQUEST:
        case EDIT_USER_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case CREATE_USER_ADDRESS_SUCCESS:
        case EDIT_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: true,
                response: action.payload,
                error: null
            }
        case CREATE_USER_ADDRESS_FAILURE:
        case EDIT_USER_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case RESET_RESPONSE:
            return {
                ...state,
                loading: true,
                response: null,
                error: null
            }
        default:
            return state;
    }
}


