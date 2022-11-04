import * as actionTypes from './types'

  
export function activateReducer(state = localStorage.getItem("temp") ? JSON.parse(localStorage.getItem("temp")):null,action){
    switch (action.type) {

        case actionTypes.VENDOR_ACTIVE:
            return action.payload
        case actionTypes.VENDOR_CLEAR:
            localStorage.removeItem("temp")
            return null

        default:
            return state;
    }
}