import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helper/axiousinstance"
import toast from "react-hot-toast"

const initialState ={
    courseData: [],
}
export const getAllcourse=createAsyncThunk("/course/get",async ()=>{
    try{
        const response=axiosInstance.get("/course")
        toast.promise(response,{
            loading:"loading Course data...",
            success:"Course loaded successfully",
            error:"failed to get course"
        })
        return (await response).data.courses
    }
    catch(e){
        toast.error(error?.response?.data?.message)
    }
})
export const Createcourse=createAsyncThunk("/course/create",async(data)=>{
    try{
        let formdata=new FormData()
        formdata.append("title",data?.title)
        formdata.append("description",data?.description)
        formdata.append("createdBy",data?.createdBy)
        formdata.append("category",data?.category)
        formdata.append("thumbnail",data?.thumbnail)
        const res=axiosInstance.post("/course",formdata)
        toast.promise(res,{
           loading:"wait creating course",
           success:(data)=>{
            return data?.data?.message
           },
           error:(data)=>{
            return data?.data?.message
           }
        })
        return (await res).data

    }
    catch(e){
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice=createSlice({
  name:"course",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getAllcourse.fulfilled,(state,action)=>{    
          if(action.payload){
          state.courseData=[...action.payload]
          }
          
    })
  }
})

export default courseSlice.reducer