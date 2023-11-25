import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helper/axiousinstance"
import toast from "react-hot-toast"

const initialState ={
  key:"",
  subscription_id:"",
  allPayment:{},
  finalMonths:{},
  monthlySalesRecord:[]
}
export const getRazorpayId=createAsyncThunk('/razorpay/api',async()=>{
  try{
    const response=await axiosInstance.get('/payments/razorpay-key')
    return response.data
  }
  catch(e){
     toast.error("failed to load data")
  }
})
export const purchaseCourseBundle=createAsyncThunk('/purchaseCourse',async()=>{
  try{
    const response=await axiosInstance.post('/payments/subscribe')
    return response.data
  }
  catch(e){
     toast.error(e?.response?.data?.message)
  }
})
export const getAllPayment=createAsyncThunk('/allpayment',async()=>{
  try{
    const response=axiosInstance.get('/payments?count=10')
    toast.promise(response,{
      loading:'getting all payment',
      success:(data)=>{
        return data?.data?.message
      },
      error:'cannot load all payment'
    })
    return (await response).data
  }
  catch(e){
     toast.error('operation failed')
  }
})
export const Unsubscribe=createAsyncThunk('/payment/unsubscribe',async(data)=>{
  try{
    const response=await axiosInstance.post('/payments/unsubscribe',data)
    return response.data
  }
  catch(e){
     toast.error(e?.response?.data?.message)
  }
})


const paymentSlice=createSlice({
  name:"payment",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
     builder.addCase(getRazorpayId.fulfilled,(state,action)=>{
      state.key=action?.payload?.API_KEY
     })
     builder.addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
      state.subscription_id=action?.payload?.subscription_id
     })
     builder.addCase(getAllPayment.fulfilled,(state,action)=>{
        state.allPayment=action?.payload?.allPayment
        state.finalMonths=action?.payload?.finalMonths
        state.monthlySalesRecord=action?.payload?.monthlySalesRecord
     })
  } 
})

export default paymentSlice.reducer