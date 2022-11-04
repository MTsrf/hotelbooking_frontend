import * as AuthApi from '../../helper/axiosInstance'
import { VENDOR_ACTIVE, VENDOR_CLEAR, VENDOR_LOGIN, VENDOR_LOGOUT } from '../types.js';


export const logIn = (formData) => async(dispatch) => {

 
    try {
        const {data} = await AuthApi.VendorlogIn(formData)

        dispatch({type :VENDOR_LOGIN,data : data})

    } catch (error) {
        console.log(error.message);
        
    }
}

// signup
export const signUp = (formData) => async(dispatch) => {

      try {
          const {data} = await AuthApi.signUp(formData)
  
          dispatch({type :VENDOR_ACTIVE,data : data})
  
      } catch (error) {
          console.log(error.message);
      }
  }


  // logout

  export const logOut = () => async(dispatch) =>{
    dispatch({type:VENDOR_LOGOUT})
  }

  export const clear = () => async(dispatch) =>{
    dispatch({type:VENDOR_CLEAR})
  }