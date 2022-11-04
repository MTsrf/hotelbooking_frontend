import * as actionTypes from './types'

  
export function vendorReducer(state = localStorage.getItem("vendor") ? JSON.parse(localStorage.getItem("vendor")):null,action){
    switch (action.type) {

        case actionTypes.VENDOR_LOGIN:
            return action.payload
        case actionTypes.VENDOR_LOGOUT:
            localStorage.removeItem("vendor")
            return null

        default:
            return state;
    }
}