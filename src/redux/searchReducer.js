import * as actionTypes from './types'

// const INITIAL_STATES = {
//     city:undefined,
//     dates:[],
//     options:{
//         adult:undefined,
//         children:undefined,
//         room:undefined,
//     }
// }

export function searchReducer(state = localStorage.getItem("search")? JSON.parse(localStorage.getItem("search")):null,action){
    switch (action.type){

        case actionTypes.SEARCH_DATA:
            localStorage.setItem("search",JSON.stringify(action.payload))
            return action.payload

        case actionTypes.SEARCH_CLEAR:
            localStorage.removeItem("search")
            return null

        default:
            return state;
    }
}