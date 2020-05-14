import { 
    USER_LOADED, 
    USER_LOADING, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOG_OUT_SUCCESS,
    REGISTER_SUCCESS, 
    REGISTER_FAIL
 } from '../actions/types';

export default function(state = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}, action){
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
            ...state,
            isLoading: false,
            user: action.payload,
            isAuthenticated: true
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true
                }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOG_OUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            }
        default:
            return state;
    }
}