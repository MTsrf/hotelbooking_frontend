import { combineReducers } from "redux";
import { activateReducer } from "./activateReducer";
import { adminReducer } from "./adminReducer";
import { bookedReducer } from "./bookedReducer";
import { searchReducer } from "./searchReducer";
import { storeReducer } from "./storeReducer";
import { userActivateReducer } from "./userActivateReducer";
import { userReducer } from "./userReducer";
import { vendorReducer } from "./vendorReducer";


const rootReducer = combineReducers({
    user:userReducer,
    vendor:vendorReducer,
    admin:adminReducer,
    temp:activateReducer,
    dumb:userActivateReducer,
    store:storeReducer,
    search:searchReducer,
    booked:bookedReducer,
})

export default rootReducer;