import * as actionType from './types'


export function bookedReducer(state = localStorage.getItem("booked")?JSON.parse(localStorage.getItem("booked")):null,action){
    switch(action.type){
        case actionType.BOOKED_DATA:
            return action.payload
        case actionType.BOOKED_CLEAR:
            localStorage.removeItem("booked")
            return null
        default:
            return state
    }
}