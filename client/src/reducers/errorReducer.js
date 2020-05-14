import { GET_ERRORS, CLEAR_ERRORS, LOGOG_OUT_SUCCESS } from '../actions/types';

export default function(state = {
    msg: {},
    status: null,
    id: null
}, action){
    switch(action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                status:action.payload.status,
                id:action.payload.id
            }
        case LOGOG_OUT_SUCCESS:
        case CLEAR_ERRORS:
            return {
                msg: {},
                status:null,
                id:null
            }
        default:
            return state;
    }
}