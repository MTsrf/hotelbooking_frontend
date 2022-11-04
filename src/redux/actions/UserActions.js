import axiosInstance from '../../helper/axiosInstance'
import { USER_FAIL, USER_LOGIN } from '../types';


export const userSignup = (formData) => async(dispatch) => {
    console.log("actions");
    try {
        console.log(formData);
        // const {data} = await axiosInstance.post('/sendOtp',formData)
        // console.log("otp data");
        // console.log(data);
        // dispatch({type :USER_LOGIN,data : data})
    } catch (error) {
        throw error
    }
}
