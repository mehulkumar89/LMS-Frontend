import {configureStore} from "@reduxjs/toolkit"
import authsliceReducer from "./slices/authslice"
import courseSlice from "./slices/courseSlice"
import paymentslice from "./slices/paymentslice"
import lectureSlice from "./slices/lectureSlice"
const store= configureStore({
    reducer:{
        auth:authsliceReducer,
        course:courseSlice,
        payment:paymentslice,
        lecture:lectureSlice
    },
    devTools:true
})

export default store