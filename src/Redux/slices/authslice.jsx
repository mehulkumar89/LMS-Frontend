import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../helper/axiousinstance";

const id=localStorage.getItem('id')

const initialState= {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {},
    fullname:localStorage.getItem('fullname') || "",
    url:localStorage.getItem('url') || "",
    email:localStorage.getItem('email')|| "",
    id:localStorage.getItem("id")||"",
    subscription:localStorage.getItem('subscription')||""
}
export const CreateAccount=createAsyncThunk("/auth/signup",async (data)=>{
    try{
        const res=axiosInstance.post("/user/register",data)
        toast.promise(res,{
           loading:"wait creating account",
           success:(data)=>{
            return data?.data?.message
           },
           error:'failed to create account'
        })
        return (await res).data
    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})
export const LoginAccount=createAsyncThunk("/auth/login",async (data)=>{
    try{
        const res=axiosInstance.post("/user/login",data)
        toast.promise(res,{
           loading:"wait autharized user",
           success:(data)=>{
            return data?.data?.message
           },
           error:'failed to Login in'
        })
        return (await res).data
    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})
export const logout=createAsyncThunk("/auth/logout",async()=>{
    try{
        const res=axiosInstance.get("/user/logout")
        toast.promise(res,{
           loading:"wait processing logout",
           success:(data)=>{
            return data?.data?.message
           },
           error:'failed to Logout'
        })
        return (await res).data

    }catch(e){
        toast.error(error?.response?.data?.message)
    }
})
export const editprofile=createAsyncThunk("/user/update",async(data)=>{
    try{
        const res=axiosInstance.put(`/user/updateProfile/${id}`,data)
        toast.promise(res,{
           loading:"wait updating profile",
           success:(data)=>{
            return data?.data?.message
           },
           error:'failed to update'
        })
        return (await res).data

    }catch(e){
        toast.error(error?.response?.data?.message)
    }
})
export const fetchUser=createAsyncThunk("/user/profile",async()=>{
    try{
        const res=axiosInstance.get(`/user/me/${id}`)
        return (await res).data

    }catch(e){
        toast.error(error?.response?.data?.message)
    }
})
export const forgotPass=createAsyncThunk("/user/forgotpassword",async(data)=>{
    try{
        const res=axiosInstance.post("/user/change-pass",data)
        toast.promise(res,{
            loading:"wait changing password",
            success:(data)=>{
             return data?.data?.message
            },
            error:'failed to change password'
         })
         return (await res).data

    }catch(e){
        toast.error(error?.response?.data?.message)
    }
})
export const verifyPayment=createAsyncThunk('/payment/verify',async(data)=>{
  try{
    const response=await axiosInstance.post(`/payments/verify/${id}`,{
      razorpay_payment_id:data.razorpay_payment_id,
      razorpay_subscription:data.razorpay_subscription,
      razorpay_signature:data.razorpay_signature
    })
    return response.data
  }
  catch(e){
     toast.error(e?.response?.data?.message)
  }
})
 const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(LoginAccount.fulfilled, (state, action) => {
               localStorage.setItem("isLoggedIn",true)
               localStorage.setItem("role",action?.payload?.user?.role)
               localStorage.setItem("fullname",action?.payload?.user?.fullname)
               localStorage.setItem("url",action?.payload?.user?.avatar?.secure_url)
               localStorage.setItem("email",action?.payload?.user?.email)
               localStorage.setItem("id",action?.payload?.user?._id)
               if((action?.payload?.user?.subscription?.status)=='active'){
               localStorage.setItem("subscription",action?.payload?.user?.subscription?.status)
               state.subscription=action?.payload?.user?.subscription?.status
               }
               else{
                localStorage.setItem("subscription",'inactive')
                state.subscription='inactive'
               }
               state.isLoggedIn=true
               state.url=action?.payload?.user?.avatar?.secure_url
               state.fullname=action?.payload?.user?.fullname
               state.email=action?.payload?.user?.email
               state.role=action?.payload?.user?.role
        })
        .addCase(verifyPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message)
            localStorage.setItem("subscription",'active')
            state.subscription='active'
           })
        .addCase(verifyPayment.rejected,(state,action)=>{
            toast.success(action?.payload?.message)
           })
        .addCase(logout.fulfilled, (state)=>{
            localStorage.clear()
            state.isLoggedIn=false
            state.data={}
            state.role=""
        })
        .addCase(fetchUser.fulfilled, (state,action)=>{
            localStorage.setItem("fullname",action?.payload?.data?.fullname)
            localStorage.setItem("url",action?.payload?.data?.avatar?.secure_url)
            state.url=action?.payload?.data?.avatar?.secure_url
            state.fullname=action?.payload?.data?.fullname
        })
    }
 })

 export default authSlice.reducer