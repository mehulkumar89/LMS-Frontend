import {configureStore} from "@reduxjs/toolkit"
import authsliceReducer from "./slices/authslice"
import courseSlice from "./slices/courseSlice"
import paymentslice from "./slices/paymentslice"
const store= configureStore({
    reducer:{
        auth:authsliceReducer,
        course:courseSlice,
        payment:paymentslice
    },
    devTools:true
})

export default store