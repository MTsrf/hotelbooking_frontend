import * as actionTypes from './types'

export function userReducer(state = {authData : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):null},action){
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            localStorage.setItem("user",JSON.stringify({...action?.data}))
            return {...state,authData : action.payload};

        case actionTypes.USER_LOGOUT:
            localStorage.removeItem("user")
            return {...state,authData:null}  

        default:
            return state;
    }
}