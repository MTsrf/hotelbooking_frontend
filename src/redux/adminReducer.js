import * as actionTypes from './types'

export function adminReducer(state = localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")):null,action){
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN:
            return action.payload
        case actionTypes.ADMIN_LOGOUT:
            localStorage.removeItem("admin")
            return null

        default:
            return state;
    }
}
