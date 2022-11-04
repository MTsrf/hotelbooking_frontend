import * as actionTypes from './types'

export function storeReducer(state = localStorage.getItem('store')?JSON.parse(localStorage.getItem('store')):null,action){
    switch (action.type) {
        case actionTypes.PRODUCTS_DATA:
            return action.payload

        case actionTypes.PRODUCTS_CLEAR:
            return null

        default:
            return state;
    }
}