import {GET_CATEGORY, ADD_CATEGORY,MODE,LOGOG_OUT_SUCCESS, DELETE_CATEGORY, CHOSEN, GET_TODO} from '../actions/types';
export default function(state = {
    category: [],
    todos: [],
    mode:''
}, action){
    switch(action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case CHOSEN:
            return{
                ...state,
                chosen: action.payload
            }
         case GET_TODO:
            return{
                ...state,
                todos: action.payload
            }
        case LOGOG_OUT_SUCCESS:
            return{
                    category: [],
                    todos: [],
                    mode:''
            }
        case MODE:
            return{
                ...state,
                mode:action.payload
            }
        default:
            return state;
    }
}