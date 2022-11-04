import * as actionTypes from './types'


export function userActivateReducer(state = localStorage.getItem("dumb") ? JSON.parse(localStorage.getItem("dumb")):null,action){
    switch(action.type){
        case actionTypes.USER_VERIFY:
            return action.payload
        
            
        case actionTypes.USER_CLEAR:
            localStorage.removeItem("dump")
            return null

        default:
            return state;
    }
}