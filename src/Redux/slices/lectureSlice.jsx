import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiousinstance";

const initialState={
    lectures:[]
}

export const getCourceLecture=createAsyncThunk("/course/lecture/get",async(id)=>{
    try{
        const response=axiosInstance.get(`/course/${id}`)
        toast.promise(response,{
            loading:'fetching cource lecture',
            success:'lectures fetched successfully',
            error:'error while fetching lectures'
        })
        return (await response).data
    }
    catch(error){
        toast.error(error?.responce?.data?.message)
    }
})
export const AddCourceLecture=createAsyncThunk("/course/lecture/add",async(data)=>{
    try{
        const formdata=new FormData()
        formdata.append("lecture",data.lecture)
        formdata.append("title",data.title)
        formdata.append("description",data.description)
        const response=axiosInstance.post(`/course/${data.id}`,formdata)
        toast.promise(response,{
            loading:'Adding lectures to course',
            success:'lectures Added successfully',
            error:'error while Adding lectures'
        })
        return (await response).data
    }
    catch(error){
        toast.error(error?.responce?.data?.message)
    }
})
export const DeleteCourceLecture=createAsyncThunk("/course/lecture/del",async(data)=>{
    try{
        const response=axiosInstance.delete(`/course/${data.id}/${data.index}`)
        toast.promise(response,{
            loading:'deleting lectures',
            success:'lectures deleted successfully',
            error:'error while deleting lectures'
        })
        return (await response).data
    }
    catch(error){

        toast.error(error?.responce?.data?.message)
    }
})

const lecturesSlice= createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getCourceLecture.fulfilled,(state,action)=>{
            state.lectures=action?.payload?.courses
        })
        .addCase(AddCourceLecture.fulfilled,(state,action)=>{
            state.lectures=action?.payload?.lectures
        })
    }
});

export default lecturesSlice.reducer